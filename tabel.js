function fetchData() {
  const urlInput = document.getElementById('url').value; // Variabel untuk URL yang diisi
  const tableContainer = document.getElementById('table-container'); // Mengambil tabel utuk di edit
  const dataTable = document.getElementById('data-table'); // 

  // Buat objek AJAX (sesuatu yang bisa mengambil request dan memprosesnya)
  const xhr = new XMLHttpRequest();
  const url = 'http://intanurul04.alwaysdata.net/bismillah_9/getcsv2json.php';
  
  // Atur fungsi penanganan ketika permintaan AJAX selesai
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) { 
      //onreadystatechange bisa diganti onload, langsung status, ga perlu xhr.readyState
      //xhr.onload = function() {
        //if (xhr.status === 200)
      //}
      //status 
      //404 = Not Found
      //403 = Forbidden
      //200 = Siap di Akses
      
      // Konversi JSON yang diterima ke objek JavaScript
      const data = JSON.parse(xhr.responseText);

      // Hapus semua baris tabel sebelum menambahkan yang baru
      dataTable.innerHTML = '';

      // Buat header tabel
      const headerRow = document.createElement('tr'); //table row
      for (const key in data[0]) {
        if (data[0].hasOwnProperty(key)) {
          const headerCell = document.createElement('th'); //table header
          headerCell.textContent = key;
          headerRow.appendChild(headerCell);
        }
      }
      dataTable.appendChild(headerRow);

      // Tambahkan data ke tabel
      data.forEach(function(item) {
        const dataRow = document.createElement('tr');
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            const dataCell = document.createElement('td'); //table cell
            dataCell.textContent = item[key];
            dataRow.appendChild(dataCell);
          }
        }
        dataTable.appendChild(dataRow);
      });

      // Tampilkan tabel
      tableContainer.style.display = 'block';
    }
    
    xhr.open('GET', urlInput, true);
    xhr.send();
  };

  let currentPage = 1;
    const entriesPerPage = 10; // Ubah sesuai kebutuhan

    function displayTableData() {
        // Hitung indeks awal dan akhir data yang akan ditampilkan
        const startIndex = (currentPage - 1) * entriesPerPage;
        const endIndex = startIndex + entriesPerPage;
        
        // Ambil tabel dan data
        const dataTable = document.getElementById('data-table');
        const data = Array.from(dataTable.getElementsByTagName('tr'));

        // Sembunyikan semua baris data
        data.forEach(row => {
        row.style.display = 'none';
        });

        // Tampilkan data yang sesuai dengan halaman saat ini
        for (let i = startIndex; i < endIndex && i < data.length; i++) {
        data[i].style.display = '';
        }
    }

    function updatePagination() {
        const urlInput = document.getElementById('url').value;
        const dataTable = document.getElementById('data-table');
        const totalEntries = dataTable.getElementsByTagName('tr').length - 1; // Kurangi satu untuk header

        const totalPages = Math.ceil(totalEntries / entriesPerPage);
        const paginationInfo = 'Menampilkan ${currentPage} - ${Math.min(currentPage + entriesPerPage - 1, totalEntries)} dari ${totalEntries} entri';

        document.getElementById('pagination-info').textContent = paginationInfo;
        document.getElementById('pagination-prev').disabled = currentPage === 1;
        document.getElementById('pagination-next').disabled = currentPage === totalPages;
    }

    function sortTable(columnIndex) {
        const dataTable = document.getElementById('data-table');
        const rows = Array.from(dataTable.getElementsByTagName('tr'));

        rows.shift(); // Hapus header

        rows.sort((a, b) => {
        const valueA = a.getElementsByTagName('td')[columnIndex].textContent;
        const valueB = b.getElementsByTagName('td')[columnIndex].textContent;

        return valueA.localeCompare(valueB);
        });

        dataTable.innerHTML = '';
        rows.forEach(row => {
        dataTable.appendChild(row);
        });

        displayTableData();
        updatePagination();
    }

    function searchTable() {
        const searchInput = document.getElementById('search-input').value.toLowerCase();
        const dataTable = document.getElementById('data-table');
        const rows = Array.from(dataTable.getElementsByTagName('tr'));

        rows.shift(); // Hapus header

        rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const rowText = Array.from(cells).map(cell => cell.textContent).join(' ').toLowerCase();
        if (rowText.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
        });
    }

    function changePage(offset) {
        currentPage += offset;
        if (currentPage < 1) {
        currentPage = 1;
        }
        displayTableData();
        updatePagination();
    }


    window.onload = () => {
        displayTableData();
        updatePagination();
    }
}