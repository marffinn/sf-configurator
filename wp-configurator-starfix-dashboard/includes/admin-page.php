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
    SELECT id, timestamp, substrate, insulation_type, hD, adhesive_thickness, recessed_depth, recommendations, email 
    FROM $table_name 
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
    <h1>Dashboard Statystyk SF</h1>

    <!-- KARTY – ELEGANCKIE, JAK WP DASHBOARD -->
    <div class="sf-stats-cards">
        <div class="sf-card">
            <div class="sf-card-icon">📊</div>
            <div class="sf-card-content">
                <h3>Łącznie</h3>
                <p id="total-count"><?php echo $total; ?></p>
            </div>
        </div>
        <div class="sf-card">
            <div class="sf-card-icon">📅</div>
            <div class="sf-card-content">
                <h3>Dzisiaj</h3>
                <p id="today-count"><?php echo $today; ?></p>
            </div>
        </div>
        <div class="sf-card">
            <div class="sf-card-icon">✉️</div>
            <div class="sf-card-content">
                <h3>Z e-mailem</h3>
                <p id="email-count"><?php echo $with_email; ?></p>
            </div>
        </div>
    </div>

    <!-- PRZYCISK USUŃ WSZYSTKIE -->
    <?php if ($total > 0): ?>
    <div style="margin: 30px 0;">
        <button id="delete-all-btn" class="button button-large" style="background:#dc3232;color:white;border:none;padding:10px 20px;border-radius:6px;">
            🗑️ Usuń wszystkie rekordy
        </button>
    </div>
    <?php endif; ?>

    <!-- WYKRESY – WIĘKSZE, Z RAMKĄ -->
    <div class="sf-charts-grid">
        <div class="sf-chart-box">
            <h3>Izolacja</h3>
            <canvas id="chartInsulation"></canvas>
        </div>
        <div class="sf-chart-box">
            <h3>Ostatnie 7 dni</h3>
            <canvas id="chartTimeline"></canvas>
        </div>
    </div>

    <!-- TABELA OSTATNIE 10 -->
    <h2 style="margin-top: 40px;">Ostatnie sugestie</h2>
    <div id="recent-table-container">
        <table class="wp-list-table widefat fixed striped posts">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Podł.</th>
                    <th>Izol.</th>
                    <th>hD</th>
                    <th>Klej</th>
                    <th>Zagł.</th>
                    <th>Sugestii</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="recent-rows">
                <?php foreach ($recent as $row): 
                    $recs = json_decode($row->recommendations, true);
                    $count = is_array($recs) ? count($recs) : 0;
                ?>
                    <tr data-id="<?php echo $row->id; ?>">
                        <td><?php echo date('d.m.Y H:i', strtotime($row->timestamp)); ?></td>
                        <td><strong><?php echo esc_html($row->substrate); ?></strong></td>
                        <td><?php echo $row->insulation_type; ?></td>
                        <td><?php echo $row->hD; ?> mm</td>
                        <td><?php echo $row->adhesive_thickness; ?> mm</td>
                        <td><?php echo $row->recessed_depth; ?> mm</td>
                        <td><strong><?php echo $count; ?></strong></td>
                        <td><?php echo $row->email ? substr(esc_html($row->email), 0, 20) . '...' : '<em>brak</em>'; ?></td>
                        <td>
                            <button class="button button-small delete-single-btn" data-id="<?php echo $row->id; ?>">
                                Usuń
                            </button>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <!-- STATYSTYKI W KOLUMNACH -->
    <div class="sf-stats-grid">
        <div>
            <h3>Po izolacji</h3>
            <div id="insulation-stats">
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
        </div>
        <div>
            <h3>Po podłożu</h3>
            <div id="substrate-stats">
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
    </div>

    <p style="margin-top: 40px; color: #666; font-size: 0.9em;">
        Źródło: <code>https://marffinn.github.io/sf-configurator/</code> | Shortcode: <code>[sf_configurator]</code>
    </p>

    <!-- STYLE – ELEGANCKI DESIGN -->
    <style>
        .sf-stats-cards { 
            display: flex; 
            gap: 20px; 
            margin: 30px 0; 
            flex-wrap: wrap; 
        }
        .sf-card {
            background: white;
            border: 1px solid #ccd0d4;
            border-radius: 8px;
            padding: 20px;
            flex: 1;
            min-width: 180px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .sf-card-icon { font-size: 2.2em; }
        .sf-card-content h3 { margin: 0; font-size: 1em; color: #555; }
        .sf-card-content p { margin: 5px 0 0; font-size: 2.2em; font-weight: bold; }

        .sf-charts-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin: 30px 0;
        }
        .sf-chart-box {
            background: white;
            border: 1px solid #ccd0d4;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .sf-chart-box h3 { margin-top: 0; margin-bottom: 15px; font-size: 1.1em; }

        .sf-stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin-top: 30px;
        }

        @media (max-width: 782px) {
            .sf-stats-cards, .sf-charts-grid, .sf-stats-grid { grid-template-columns: 1fr; }
        }

        canvas { max-height: 200px !important; width: 100% !important; }
    </style>

    <!-- SKRYPT – BEZ ZMIAN (AJAX + CHARTS) -->
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const ctx1 = document.getElementById('chartInsulation')?.getContext('2d');
        const ctx2 = document.getElementById('chartTimeline')?.getContext('2d');
        let chart1, chart2;

        function updateCharts() {
            fetch(ajaxurl + '?action=sf_get_stats_summary')
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        document.getElementById('total-count').textContent = data.data.total;
                        document.getElementById('today-count').textContent = data.data.today;
                        document.getElementById('email-count').textContent = data.data.with_email;

                        if (chart1) chart1.destroy();
                        if (chart2) chart2.destroy();

                        if (ctx1 && data.data.by_insulation.length) {
                            chart1 = new Chart(ctx1, {
                                type: 'doughnut',
                                data: { labels: data.data.by_insulation.map(d => d.insulation_type), datasets: [{ data: data.data.by_insulation.map(d => d.count), backgroundColor: ['#ff6384', '#36a2eb'] }] },
                                options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom' } } }
                            });
                        }

                        if (ctx2 && data.data.timeline.length) {
                            chart2 = new Chart(ctx2, {
                                type: 'line',
                                data: { labels: data.data.timeline.map(d => d.date), datasets: [{ label: 'Użycia', data: data.data.timeline.map(d => d.count), borderColor: '#2271b1', backgroundColor: 'rgba(34,113,177,0.1)', fill: true }] },
                                options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true } } }
                            });
                        }
                    }
                });
        }

        function attachDeleteListeners() {
            document.querySelectorAll('.delete-single-btn').forEach(btn => {
                btn.onclick = function() {
                    const id = this.dataset.id;
                    const row = this.closest('tr');
                    if (!confirm('Usunąć ten rekord?')) return;

                    fetch(ajaxurl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: 'action=sf_delete_single_stat&id=' + id + '&nonce=' + sfAdminData.nonce
                    })
                    .then(r => r.json())
                    .then(res => {
                        if (res.success) {
                            row.remove();
                            updateCharts();
                            refreshStatsTables();
                            if (!document.querySelector('#recent-rows tr')) refreshRecentTable();
                        }
                    });
                };
            });
        }

        function refreshRecentTable() {
            fetch(ajaxurl + '?action=sf_get_recent_rows')
                .then(r => r.text())
                .then(html => {
                    document.getElementById('recent-rows').innerHTML = html;
                    attachDeleteListeners();
                });
        }

        function refreshStatsTables() {
            fetch(ajaxurl + '?action=sf_get_insulation_stats').then(r => r.text()).then(h => document.querySelector('#insulation-stats tbody').innerHTML = h);
            fetch(ajaxurl + '?action=sf_get_substrate_stats').then(r => r.text()).then(h => document.querySelector('#substrate-stats tbody').innerHTML = h);
        }

        document.getElementById('delete-all-btn')?.addEventListener('click', function() {
            if (confirm('Usunąć WSZYSTKIE rekordy?')) {
                fetch(ajaxurl, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'action=sf_delete_all_stats&nonce=' + sfAdminData.nonce })
                    .then(() => location.reload());
            }
        });

        attachDeleteListeners();
        updateCharts();
    });
    </script>
</div>