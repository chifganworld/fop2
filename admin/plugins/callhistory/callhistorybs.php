<?php
header("Content-Type: text/html; charset=utf-8");
require_once("../../../config.php");
?>
<div class='framecontent'>
<ul class='nav nav-tabs' id="tabnav">
<li role="presentation" class="active"><a href="#tab-incoming"><span id='incomingTag'>Incoming</span></a></li>
<li role="presentation"><a href="#tab-outgoing"><span id='outgoingTag'>Outgoing</span></a></li>
</ul>
<div class="tab-content" style='height:100%;'>
<div id="tab-incoming" class="tab-pane fade in active" style='padding:10px 0; height:100%;'>
  <iframe src="admin/plugins/callhistory/callhistorybsgrid.php?filterdir=inbound" align='center' width='100%' height='100%' style='border:0;'>
  </iframe>
</div>
<div id="tab-outgoing" class="tab-pane fade in" style='padding:10px 0; height:100%;'>
  <iframe src="admin/plugins/callhistory/callhistorybsgrid.php?filterdir=outbound" align='center' width='100%' height='100%' style='border:0;'>
  </iframe>
</div>
</div>
</div>
</div>
<script>
  $(function() {
    $('#tabnav a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });
    parent.plugins['callhistory'].setLang();
  });
</script>
