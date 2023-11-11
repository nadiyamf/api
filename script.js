function getDataFromCSV() {
    fetch('datapribadi.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            const headers = rows[0].split(',');
            const mahasiswaData = rows.slice(1).map(row => row.split(','));

            const table = document.getElementById('mahasiswaTable');
            for (let i = 0; i < mahasiswaData.length; i++) {
                const row = document.createElement('tr');
                for (let j = 0; j < headers.length; j++) {
                    const cell = document.createElement(i === 0 ? 'th' : 'td');
                    cell.textContent = mahasiswaData[i][j];
                    row.appendChild(cell);
                }
                table.appendChild(row);
            }
        });
}
function addDataToTable(event) {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const email2 = document.getElementById('email2').value;
    const profesi = document.getElementById('profesi').value;

    const table = document.getElementById('mahasiswaTable');
    const newRow = table.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);

    cell1.textContent = id;
    cell2.textContent = firstName;
    cell3.textContent = lastName;
    cell4.textContent = email;
    cell5.textContent = email2;
    cell6.textContent = profesi;

    document.getElementById('addForm').reset();
}

getDataFromCSV();

document.getElementById('addForm').addEventListener('input', addDataToTable);
