<?php
header("Content-Type: text/html; charset=utf-8");
require_once("../../../config.php");
?>
<div style='width: 100%; padding: 0; margin:auto;'>
<div id="tabs">
<ul id='tabnav' class='tabnav'>
<li><a href="#tab-incoming"><span id='incoming'>Incoming</span></a></li>
<li><a href="#tab-outgoing"><span id='outgoing'>Outgoing</span></a></li>
</ul>
<div id="tab-incoming" class="xpanel" style='padding:0'>
  <iframe src="admin/plugins/callhistory/callhistorygrid.php?filterdir=inbound" align='center' width='100%' height='300' style='border:0;'>
  </iframe>
</div>
<div id="tab-outgoing" class="xpanel" style='padding:0'>
  <iframe src="admin/plugins/callhistory/callhistorygrid.php?filterdir=outbound" align='center' width='100%' height='300' style='border:0;'>
  </iframe>
</div>
</div>
</div>
<script>
  $(function() {
    $( "#tabs" ).tabs();
  });
</script>
