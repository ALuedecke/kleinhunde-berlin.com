<?php
/*
 * Author:   A. Luedecke
 * Purpose:  Logging visitors ip-addresses
 * Created:  Dec/03/2015
 */
  $ip     = $_SERVER["REMOTE_ADDR"];
  $host   = gethostbyaddr($ip);
  $ip_log = 'logs/visitor_ip.log';
  $txt    = 'Sie sind Besucher:';
  
  if (isset($_GET['text'])) {
      $txt = $_GET['text'];
  }
  
  if ($txt == 'showlog') {
      if (!file_exists($ip_log)) {
          die("ERROR: File $ip_log is not present!");
      }
    
      $out = file($ip_log);
      $size = sizeof($out);
      
      echo '<!DOCTYPE html>';
      echo '<html>';
      echo '<head><title>IP Log</title></head>';
      echo '<body style="background-color:Black;color:#00C0FF;font-family:courier;">';
      echo '<table style="width:100%">';
      echo '<tr style="background-color:#00C0FF;color:Black;">';
      echo '<th style="width:20%">Datum</th>';
      echo '<th style="width:35%">Hostname</th>';
      echo '<th style="width:40%">IP Adresse</th>';
      echo '</tr>';
      
      for ($i = 1; $i <= $size; $i++) {
          echo $out[$size - $i];
      }
      
      echo '</table>';
      echo '</body>';
      echo '</html>';
  } else {
      // Open/create the ip log file
      if ($fh = fopen($ip_log, 'a')) {
          $locked = flock($fh, LOCK_EX);
	
	      if ($locked) {
              fwrite(
                  $fh
                 ,'<tr>' . 
                  '<td>' . date('d.m.Y H:i:s', time()) . '</td>' .
                  '<td>' . $host . '</td>' . 
                  '<td>' . $ip . '</td>' . 
                  '</tr>' . PHP_EOL
              );
	      }
	      flock($fh, LOCK_UN);
	      fclose($fh);
      } else {
          die("ERROR: Can not open file $ip_log");
      }
      echo 'document.write(\'' . $txt . '<br />\');';
  }
?>