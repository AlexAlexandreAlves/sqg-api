import fs from 'fs';
import path from 'path';

function generateReport(results: any[]) {
    const reportPath = path.join(process.cwd(), 'test-report.html');
    const passedTests = results.reduce((acc, suite) => acc + suite.tests.filter((test: any) => test.status === 'passed').length, 0);
    const failedTests = results.reduce((acc, suite) => acc + suite.tests.filter((test: any) => test.status === 'failed').length, 0);
    const skippedTests = results.reduce((acc, suite) => acc + suite.tests.filter((test: any) => test.status === 'skipped').length, 0);

    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333; margin: 0; padding: 20px; }
        h1 { text-align: center; color: #444; }
        .tabs { display: flex; justify-content: center; margin-bottom: 20px; }
        .tab { padding: 10px 20px; cursor: pointer; background-color: #ddd; border: 1px solid #ccc; border-radius: 5px 5px 0 0; margin-right: 5px; }
        .tab.active { background-color: #fff; border-bottom: none; }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
        .suite { margin-bottom: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; background-color: #fff; }
        .suite h2 { margin: 0; padding: 10px; background-color: #eee; border-bottom: 1px solid #ddd; }
        .test { margin-left: 20px; padding: 10px; border: 2px solid; border-radius: 5px; margin-bottom: 10px; position: relative; }
        .passed { border-color: green; }
        .failed { border-color: red; }
        .skipped { border-color: orange; }
        .test pre { background-color: #f9f9f9; padding: 10px; border-radius: 5px; display: none; }
        .toggle-button { position: absolute; top: 10px; right: 10px; cursor: pointer; background-color: #ddd; border: none; padding: 5px; border-radius: 5px; }
        .chart-container { display: flex; justify-content: center; align-items: center; height: 400px; }
        .chart-container canvas { max-width: 100%; max-height: 100%; }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h1>Test Report</h1>
    <div class="tabs">
        <div class="tab active" onclick="showTab('results')">Results</div>
        <div class="tab" onclick="showTab('chart')">Chart</div>
    </div>
    <div id="results" class="tab-content active">
        ${results.map(suite => `
            <div class="suite">
                <h2>${suite.suite} - ${suite.status}</h2>
                ${suite.tests.map((test: { status: any; test: any; error: any; responseBody: any; statusCode: any; }) => `
                    <div class="test ${test.status}">
                        <strong>${test.test} - ${test.status}</strong>
                        ${test.statusCode ? `<div>Status Code: ${test.statusCode}</div>` : ''}
                        ${test.responseBody ? `<button class="toggle-button" onclick="toggleVisibility(this)">Show Response</button><pre>Response Body: ${JSON.stringify(test.responseBody, null, 2)}</pre>` : ''}
                        ${test.error ? `<pre>${test.error}</pre>` : ''}
                    </div>
                `).join('')}
            </div>
        `).join('')}
    </div>
    <div id="chart" class="tab-content">
        <div class="chart-container">
            <canvas id="testChart" width="400" height="400"></canvas>
        </div>
    </div>
    <script>
        function toggleVisibility(button) {
            const pre = button.nextElementSibling;
            if (pre.style.display === 'none') {
                pre.style.display = 'block';
                button.textContent = 'Hide Response';
            } else {
                pre.style.display = 'none';
                button.textContent = 'Show Response';
            }
        }

        function showTab(tabId) {
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.querySelector(\`.tab[onclick="showTab('\${tabId}')"]\`).classList.add('active');
            document.getElementById(tabId).classList.add('active');
        }

        const ctx = document.getElementById('testChart').getContext('2d');
        const testChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Passed', 'Failed', 'Skipped'],
                datasets: [{
                    data: [${passedTests}, ${failedTests}, ${skippedTests}],
                    backgroundColor: ['green', 'red', 'orange']
                }]
            }
        });
    </script>
</body>
</html>
    `;

    fs.writeFileSync(reportPath, html);
    console.log(`Test report generated at ${reportPath}`);
}

export default generateReport;