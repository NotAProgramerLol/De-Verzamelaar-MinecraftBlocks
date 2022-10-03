<?php
function base64url_encode($string)
{
    return rtrim(strtr(base64_encode($string), "+/", "-_"), "=");
}
?>