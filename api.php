<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Terima data dari formulir
    $id = $_POST['id'];
    $F_name = $_POST['F_name'];
    $L_name = $_POST['L_name'];
    $email = $_POST['email'];
    $email2 = $_POST['email2'];
    $profesi = $_POST['profesi'];
    // Dapatkan data dari bidang lainnya

    $url = 'http://nadiyamf.alwaysdata.net/getcsv2json.php';

    $ch = curl_init($url);

    // Set konfigurasi untuk melakukan POST
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Jalankan request
    $response = curl_exec($ch);

    // Tutup koneksi cURL
    curl_close($ch);

    // Handle response
    if ($response === false) {
        echo 'Ada kesalahan dalam permintaan POST.';
    } else {
        echo 'Data berhasil dikirim.';
    }
}
?>