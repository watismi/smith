<?php
    $url = file_get_contents(urlencode($_GET["url"]));
    echo $url;
?>