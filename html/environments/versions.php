<?php

$request_uri = parse_url($_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"]);
$request_query = $request_uri['query'];
$request_parameters = explode('&', $request_query);

for

$version_url = 'http://www.zappos.com/version.txt';
$raw = file_get_contents($version_url);

print_r($raw);

?>
