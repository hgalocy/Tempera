<?php
include 'db_connection.php';

$conn = Connect();

echo "Connected Successfully";

CloseConnect($conn);

?>