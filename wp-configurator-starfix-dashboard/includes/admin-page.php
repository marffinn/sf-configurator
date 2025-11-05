<?php
if (!current_user_can('manage_options')) {
    wp_die('Brak uprawnień.');
}

global $wpdb;
$table_name = $wpdb->prefix . 'sf_stats';

// === STATYSTYKI OGÓLNE ===
$total = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
$today = $wpdb->get_var("SELECT COUNT(*) FROM $table_name WHERE DATE(timestamp) = CURDATE()");
$with_email = $wpdb->get_var("SELECT COUNT(*) FROM $table_name WHERE email IS NOT NULL AND email != ''");

// === OSTATNIE 10 ===
$recent = $wpdb->get_results("
    SELECT * FROM $table_name 
    ORDER BY timestamp DESC 
    LIMIT 10
");

// === PO IZOLACJI ===
$by_insulation = $wpdb->get_results("
    SELECT insulation_type, COUNT(*) as count, AVG(hD) as avg_hd 
    FROM $table_name 
    GROUP BY insulation_type
");

// === PO PODŁOŻU ===
$by_substrate = $wpdb->get_results("
    SELECT substrate, COUNT(*) as count 
    FROM $table_name 
    GROUP BY substrate
");

// === TIMELINE 7 DNI ===
$timeline_7days = $wpdb->get_results("
    SELECT DATE(timestamp) as date, COUNT(*) as count 
    FROM $table_name 
    WHERE timestamp >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
    GROUP BY DATE(timestamp)
    ORDER BY date
");
?>

<div class="wrap">
    <h1>Dashboard Statystyk – Konfigurator SF</h1>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0;">
        <div class="card" style="background:#fff; padding:20px; border:1px solid #ccc; border-radius:8px; text-align:center;">
            <h3>Łącznie sugestii</h3>
            <p style="font-size:2em; margin:10px 0; color:#d63638;"><?php echo $total; ?></p>
        </div>
        <div class="card" style="background:#fff; padding:20px; border:1px solid #ccc; border-radius:8px; text-align:center;">
            <h3>Dzisiaj</h3>
            <p style="font-size:2em; margin:10px 0; color:#2271b1;"><?php echo $today; ?></p>
        </div>
        <div class="card" style="background:#fff; padding:20px; border:1px solid #ccc; border-radius:8px; text-align:center;">
            <h3>Z e-mailem</h3>
            <p style="font-size:2em; margin:10px 0; color:#7cb342;"><?php echo $with_email; ?></p>
        </div>
    </div>

    <!-- WYKRESY -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 40px 0;">
        <div class="card" style="background:#fff; padding:20px; border:1px solid #ccc; border-radius:8px;">
            <h3>Rozkład po typie izolacji</h3>
            <canvas id="chartInsulation" height="200"></canvas>
        </div>
        <div class="card" style="background:#fff; padding:20px; border:1px solid #ccc; border-radius:8px;">
            <h3>Sugestie w czasie (7 dni)</h3>
            <canvas id="chartTimeline" height="200"></canvas>
        </div>
    </div>

    <h2>Ostatnie 10 sugestii</h2>
    <table class="wp-list-table widefat fixed striped table-view-list">
        <thead>
            <tr>
                <th>Data</th>
                <th>Podłoże</th>
                <th>Izolacja</th>
                <th>hD</th>
                <th>Klej</th>
                <th>Zagł.</th>
                <th>Sugestii</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($recent as $row): 
                $recs = json_decode($row->recommendations, true);
                $count = is_array($recs) ? count($recs) : 0;
            ?>
                <tr>
                    <td><?php echo date('d.m H:i', strtotime($row->timestamp)); ?></td>
                    <td><strong><?php echo esc_html($row->substrate); ?></strong></td>
                    <td><?php echo $row->insulation_type; ?></td>
                    <td><?php echo $row->hD; ?> mm</td>
                    <td><?php echo $row->adhesive_thickness; ?> mm</td>
                    <td><?php echo $row->recessed_depth; ?> mm</td>
                    <td><strong><?php echo $count; ?></strong></td>
                    <td><?php echo $row->email ? esc_html($row->email) : '<em>brak</em>'; ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <div style="display: flex; gap: 20px; margin-top: 40px;">
        <div style="flex:1;">
            <h2>Po typie izolacji</h2>
            <table class="wp-list-table widefat fixed striped">
                <thead><tr><th>Izolacja</th><th>Liczba</th><th>Śr. hD</th></tr></thead>
                <tbody>
                    <?php foreach ($by_insulation as $stat): ?>
                        <tr>
                            <td><?php echo $stat->insulation_type; ?></td>
                            <td><strong><?php echo $stat->count; ?></strong></td>
                            <td><?php echo round($stat->avg_hd); ?> mm</td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <div style="flex:1;">
            <h2>Po podłożu</h2>
            <table class="wp-list-table widefat fixed striped">
                <thead><tr><th>Podłoże</th><th>Liczba</th></tr></thead>
                <tbody>
                    <?php foreach ($by_substrate as $stat): ?>
                        <tr>
                            <td><strong><?php echo $stat->substrate; ?></strong></td>
                            <td><?php echo $stat->count; ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

    <p style="margin-top:40px; color:#666; font-size:0.9em;">
        <strong>Źródło:</strong> <code>https://marffinn.github.io/sf-configurator/</code><br>
        <strong>Shortcode:</strong> <code>[sf_configurator height="900px"]</code>
    </p>

    <style>
        .wrap .card { background: #fff; padding: 20px; margin: 20px 0; border: 1px solid #ccd0d4; border-radius: 4px; }
    </style>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const ctx1 = document.getElementById('chartInsulation').getContext('2d');
        const ctx2 = document.getElementById('chartTimeline').getContext('2d');

        // Dane z PHP
        const insulationData = <?php echo wp_json_encode($by_insulation); ?>;
        const timelineData = <?php echo wp_json_encode($timeline_7days); ?>;

        // Wykres kołowy
        new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: insulationData.map(d => d.insulation_type),
                datasets: [{
                    data: insulationData.map(d => d.count),
                    backgroundColor: ['#ff6384', '#36a2eb'],
                    borderWidth: 1
                }]
            },
            options: { 
                responsive: true, 
                plugins: { legend: { position: 'bottom' } } 
            }
        });

        // Wykres liniowy
        new Chart(ctx2, {
            type: 'line',
            data: {
                labels: timelineData.map(d => d.date),
                datasets: [{
                    label: 'Sugestii',
                    data: timelineData.map(d => d.count),
                    borderColor: '#d63638',
                    backgroundColor: 'rgba(214, 54, 56, 0.1)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } },
                plugins: { legend: { display: false } }
            }
        });
    });
    </script>
</div>