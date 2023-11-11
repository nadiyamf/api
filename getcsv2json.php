<?php

function csvToJson($csvUrl) {
    $csvData = [];
    
    if (($handle = fopen($csvUrl, 'r')) !== false) {
        while (($row = fgetcsv($handle)) !== false) {
            $csvData[] = $row;
        }
        fclose($handle);
    }

    // Assuming the first row of the CSV contains the column headers
    $headers = array_shift($csvData);

    $jsonArray = [];

    foreach ($csvData as $row) {
        $jsonArrayItem = array();
        for ($i=0; $i<count($headers); $i++) {
            $jsonArrayItem[$headers[$i]] = $row[$i];
        }
        $jsonArray[] = $jsonArrayItem;
    }
    $jsonArray = ["data"=> $jsonArray];
    return json_encode($jsonArray);
}

$csvUrl = 'http://nadiyamf.alwaysdata.net/datapribadi.csv';
$jsonData = csvToJson($csvUrl);

// Set the content type to JSON
header('Content-Type: application/json');

// Output the JSON data
echo $jsonData;

?>
