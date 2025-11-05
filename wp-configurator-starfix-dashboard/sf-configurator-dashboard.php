<?php
/**
 * Plugin Name: SF Konfigurator Dashboard
 * Description: Osadza konfigurator z https://marffinn.github.io/sf-configurator/ i zbiera statystyki w dashboardzie.
 * Version: 1.1.0
 * Author: Marffinn
 * Text Domain: sf-configurator-dashboard
 */

if (!defined('ABSPATH')) exit;

// === AKTYWACJA: Utwórz tabelę w bazie ===
register_activation_hook(__FILE__, 'sf_create_stats_table');
function sf_create_stats_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'sf_stats';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        timestamp datetime DEFAULT CURRENT_TIMESTAMP,
        substrate varchar(10) NOT NULL,
        insulation_type varchar(10) NOT NULL,
        hD int NOT NULL,
        adhesive_thickness int NOT NULL,
        recessed_depth int NOT NULL,
        recommendations text NOT NULL,
        email varchar(255),
        ip_address varchar(45),
        user_agent text,
        PRIMARY KEY (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

// === SHORTCODE: Osadzenie iframe z konfigurator ===
function sf_configurator_shortcode($atts) {
    $atts = shortcode_atts([
        'width' => '100%',
        'height' => '900px'
    ], $atts, 'sf_configurator');

    return '<div class="sf-configurator-wrapper">
        <iframe 
            src="https://marffinn.github.io/sf-configurator/" 
            width="' . esc_attr($atts['width']) . '" 
            height="' . esc_attr($atts['height']) . '" 
            frameborder="0" 
            style="border:1px solid #ddd; border-radius:8px; width:100%;"
            title="Konfigurator Łączników ETICS"
            allowfullscreen>
        </iframe>
    </div>';
}
add_shortcode('sf_configurator', 'sf_configurator_shortcode');

// === REST API: Endpoint do zapisu statystyk ===
add_action('rest_api_init', 'sf_register_stats_endpoint');
function sf_register_stats_endpoint() {
    register_rest_route('sf/v1', '/stats', [
        'methods' => 'POST',
        'callback' => 'sf_handle_stats_submission',
        'permission_callback' => '__return_true',
        'args' => [
            'substrate' => ['required' => true, 'sanitize_callback' => 'sanitize_text_field'],
            'insulation_type' => ['required' => true, 'sanitize_callback' => 'sanitize_text_field'],
            'hD' => ['required' => true, 'validate_callback' => 'is_numeric'],
            'adhesive_thickness' => ['required' => true, 'validate_callback' => 'is_numeric'],
            'recessed_depth' => ['required' => true, 'validate_callback' => 'is_numeric'],
            'recommendations' => ['required' => true],
            'email' => ['required' => false, 'sanitize_callback' => 'sanitize_email'],
        ]
    ]);
}

function sf_handle_stats_submission(WP_REST_Request $request) {
    // Sprawdź nonce
    $nonce = $request->get_header('X-WP-Nonce');
    if (!wp_verify_nonce($nonce, 'wp_rest')) {
        return new WP_Error('invalid_nonce', 'Błędny nonce.', ['status' => 403]);
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'sf_stats';

    $data = $request->get_params();
    $recommendations = is_array($data['recommendations']) ? wp_json_encode($data['recommendations']) : '';

    $inserted = $wpdb->insert(
        $table_name,
        [
            'substrate' => $data['substrate'],
            'insulation_type' => $data['insulation_type'],
            'hD' => intval($data['hD']),
            'adhesive_thickness' => intval($data['adhesive_thickness']),
            'recessed_depth' => intval($data['recessed_depth']),
            'recommendations' => $recommendations,
            'email' => !empty($data['email']) ? $data['email'] : null,
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? ''
        ],
        ['%s', '%s', '%d', '%d', '%d', '%s', '%s', '%s', '%s']
    );

    if ($inserted) {
        return ['success' => true, 'message' => 'Statystyki zapisane.', 'id' => $wpdb->insert_id];
    } else {
        return new WP_Error('db_error', 'Nie udało się zapisać.', ['status' => 500]);
    }
}

// === ADMIN MENU: Dashboard ===
add_action('admin_menu', 'sf_add_admin_menu');
function sf_add_admin_menu() {
    add_menu_page(
        'SF Dashboard',
        'SF Dashboard',
        'manage_options',
        'sf-dashboard',
        'sf_render_dashboard_page',
        'dashicons-chart-line',
        58
    );
}

function sf_render_dashboard_page() {
    include plugin_dir_path(__FILE__) . 'includes/admin-page.php';
}

// === INJECT NONCE + postMessage listener do iframe ===
add_action('wp_head', 'sf_inject_communication_script');
function sf_inject_communication_script() {
    if (has_shortcode(get_the_content(), 'sf_configurator')) {
        $nonce = wp_create_nonce('wp_rest');
        $rest_url = rest_url('sf/v1/stats');
        ?>
        <script>
            window.sfConfig = {
                nonce: '<?php echo $nonce; ?>',
                restUrl: '<?php echo $rest_url; ?>'
            };

            // Nasłuchuj wiadomości z iframe
            window.addEventListener('message', function(event) {
                if (event.origin !== 'https://marffinn.github.io') return;
                if (event.data && event.data.type === 'SF_STATS') {
                    fetch(window.sfConfig.restUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-WP-Nonce': window.sfConfig.nonce
                        },
                        body: JSON.stringify(event.data.payload)
                    })
                    .then(r => r.json())
                    .then(data => console.log('SF Stats saved:', data))
                    .catch(err => console.error('SF Stats error:', err));
                }
            });
        </script>
        <?php
    }
}

// === STYLE DLA WRAPPER ===
add_action('wp_enqueue_scripts', 'sf_enqueue_styles');
function sf_enqueue_styles() {
    if (has_shortcode(get_the_content(), 'sf_configurator')) {
        wp_add_inline_style('wp-block-library', '
            .sf-configurator-wrapper { margin: 20px 0; }
            .sf-configurator-wrapper iframe { max-width: 100%; }
        ');
    }
}

// === ENQUEUE CHART.JS DLA DASHBOARD ===
add_action('admin_enqueue_scripts', 'sf_admin_scripts');
function sf_admin_scripts($hook) {
    if ($hook !== 'toplevel_page_sf-dashboard') return;

    // Chart.js (lokalna kopia)
    wp_enqueue_script('chart-js', plugin_dir_url(__FILE__) . 'assets/chart.umd.min.js', [], '4.4.0', true);
    wp_enqueue_script('sf-admin-js', plugin_dir_url(__FILE__) . 'assets/admin.js', ['jquery', 'chart-js'], '1.1', true);

    // Przekaż dane do JS
    global $wpdb;
    $table = $wpdb->prefix . 'sf_stats';

    $timeline = $wpdb->get_results("
        SELECT DATE(timestamp) as date, COUNT(*) as count 
        FROM $table 
        WHERE timestamp >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        GROUP BY DATE(timestamp)
        ORDER BY date
    ");

    wp_localize_script('sf-admin-js', 'sfChartData', [
        'timeline' => $timeline
    ]);
}
?>