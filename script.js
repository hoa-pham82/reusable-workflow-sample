/* eslint-disable prettier/prettier */

fetch('report.json')
    .then(response => response.json())
    .then(data => {
        // Populate the table with dynamic data
        const table = document.getElementById('testTable');

        data.forEach(testType => {
            const row = table.insertRow();
            const columns = ['testType', 'totalTestCases', 'totalPass', 'totalFail', 'reportLink'];

            columns.forEach(column => {
                const cell = row.insertCell();
                if (column === 'reportLink') {
                    cell.innerHTML = `<a href="${testType[column]}">View Report</a>`;
                } else {
                    cell.textContent = testType[column];
                }
            });
        });
    })
    .catch(error => {
        console.error('Error fetching test data:', error);
    });
