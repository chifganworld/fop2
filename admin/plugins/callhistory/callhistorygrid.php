<?php
header("Content-Type: text/html; charset=utf-8");
require_once("../../../config.php");
?>
<!DOCTYPE html>
<html>
<head>
<?php
if(isset($page_title)) { 
    echo "    <title>$page_title></title>\n"; 
} else {
    echo "    <title>".TITLE."</title>\n"; 
}
?>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="imagetoolbar" content="false"/>
    <meta name="MSSmartTagsPreventParsing" content="true"/>
    <meta name="description" content=""/>
    <meta name="keywords" content=""/>
    <link rel="stylesheet" type="text/css" media="screen" href="../../../css/fluid/reset.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="../../../css/fluid/text.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="../../../css/dbgrid.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="../../../css/stable.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="../../../css/vmail.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="../../../css/jquery.qtip.min.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="../../../css/alertify.core.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="../../../css/alertify.default.css" />
    <script type="text/javascript" src="../../../js/swfobject.js"></script>
    <script type="text/javascript" src="../../../js/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="../../../js/jquery-ui-1.10.3.custom.min.js"></script>
    <script type="text/javascript" src="../../../js/jquery.qtip.min.js"></script>
    <script type="text/javascript" src="../../../js/alertify.min.js"></script>

<?php
if(isset($extrahead)) {
    foreach($extrahead as $bloque) {
        echo "$bloque";
    }
}
?>
<script>

function debug(message) {
    if(window.console !== undefined) {
        console.log(message);
    }
};

function setFilterDir(elem) {
    valor = elem.options[elem.selectedIndex].value;
    insertParam('filterdir',valor);
}

function setFilterDispo(elem) {
    valor = elem.options[elem.selectedIndex].value;
    insertParam('filterdispo',valor);
}


function insertParam(key, value)
{
    key = escape(key); value = escape(value);

    var kvp = document.location.search.substr(1).split('&');

    var i=kvp.length; var x; while(i--) 
    {
        x = kvp[i].split('=');

        if (x[0]==key)
        {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
        }
    }

    if(i<0) {kvp[kvp.length] = [key,value].join('=');}

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&'); 
}

function playVmail(hash,file,iconid) {

    var url  = 'setvar.php';
    var pars = 'sesvar=vfile&value='+file;
    var url2 = "download.php?file="+hash+"!"+file;

    if($(''+iconid).hasClassName('pauseicon')) {
        window.TinyWav.Pause(url2,iconid);
    } else {
        $(''+iconid).addClassName('waiticon');

        var pepe = new Ajax.Request(url, {
          method: 'post',
          postBody:pars,
          onSuccess: function(transp) {
              debug("success "+url2);
              if($(''+iconid).hasClassName('playicon')) {
                  $(''+iconid).removeClassName('waiticon');
                  debug("success play");
                  window.TinyWav.Play(url2,iconid);
              }
          }
        });
    }
}

function downloadVmail(hash,file) {

    var url   = 'setvar.php';
    var pars1 = 'sesvar=vfile&value='+file;
    var pars2 = hash+"!"+file;
    var areq = new Ajax.Request(url, {
      method: 'post',
      postBody:pars1,
      onSuccess: function(transp) {
          downloadFile("download.php",pars2);
      }
    });
}

function downloadFile(url,pars) {
    $('#dloadfrm').attr('action',url);
    $('#file').val(pars); 
    $('#dloadfrm').submit();
}

</script>

</head>
<body style='overflow-x: hidden; background: #EAE6C9;'>
<?php

$context   = $_SESSION[MYAP]['context'];
$extension = $_SESSION[MYAP]['extension'];
$permit    = $_SESSION[MYAP]['permit'];
$admin     = isset($_SESSION[MYAP]['admin'])?$_SESSION[MYAP]['admin']:0;
$permisos  = preg_split("/,/",$permit);

if(in_array("all",$permisos) || in_array("callhistory",$permisos)) {
    $allowed='yes';
} else {
    $allowed='no';
}


if($allowed <> "yes") {
   die("You do not have permissions to access this resource.");
}

if($context=="") { 
    $addcontext="";
} else {
    $addcontext="${context}_";
}

// Sanitize Input
$addcontext = preg_replace("/\.[\.]+/", "", $addcontext);
$addcontext = preg_replace("/^[\/]+/", "", $addcontext);
$addcontext = preg_replace("/^[A-Za-z][:\|][\/]?/", "", $addcontext);

$extension = preg_replace("/'/", "",  $extension );
$extension = preg_replace("/\"/", "", $extension );
$extension = preg_replace("/;/", "",  $extension );

$transinbound = trans('inbound');
$transoutbound = trans('outbound');

$grid =  new dbgrid($db);
$grid->set_table($CDRDBTABLE);
$grid->set_pk('uniqueid');
$grid->add_structure('number', 'text',null,'');
$grid->salt("dldli3ksa");
$grid->set_fields("unix_timestamp(calldate) as calldate,concat(IF(dst='".$extension."' OR dstchannel LIKE 'SIP/$extension-________' ,src,dst),'!',clid) as number,duration,disposition,uniqueid");
$grid->hide_field('uniqueid');
$grid->no_edit_field('uniqueid');
$grid->no_edit_field('number');
$grid->set_per_page(6);


$condstring="";

$mifilt = isset($_REQUEST['filterdir'])?$_REQUEST['filterdir']:'';

if($mifilt=="") {
    $condstring ="(src='$extension' OR channel LIKE 'SIP/$extension-________' OR dst='$extension' OR dstchannel LIKE 'SIP/$extension-________' ) ";
} else if($mifilt=="inbound") {
    $condstring ="(dst='$extension' OR dstchannel LIKE 'SIP/$extension-________') ";
} else {
    $condstring="(src='$extension' OR channel LIKE 'SIP/$extension-________') ";
}

$mifilt = isset($_REQUEST['filterdispo'])?$_REQUEST['filterdispo']:'';

if($mifilt<>"") {
    if($condstring<>"") { $condstring .= " AND "; }
    $condstring .="(disposition='".strtoupper($mifilt)."') ";
} 

// Uncomment this if you want to make the cdr reports tenant aware in Thirdlane or similar setups
// The userfield might need to be changed to the proper field
//
// if($condstring<>"") { $condstring .= " AND "; }
// $condstring .= "(userfield='$context') ";


$customboton="<div class='fbutton' style='margin-top:4px;'>
             <select name='filterbydispo' onchange='setFilterDispo(this)'>";
$customboton.="<option value='' "; if($mifilt=='') { $customboton.= 'selected'; }; $customboton.= ">".trans('All')."</option>\n";
$customboton.="<option value='answered' "; if($mifilt=='answered'){ $customboton.= 'selected';}; $customboton.= ">".trans('Answered')."</option>\n";
$customboton.="<option value='no answer' ";if($mifilt=='no answer'){ $customboton.= 'selected';}; $customboton.= ">".trans('No answer')."</option>\n";
$customboton.="<option value='busy' ";if($mifilt=='busy'){ $customboton.= 'selected';}; $customboton.= ">".trans('Busy')."</option>\n";
$customboton.="<option value='failed' ";if($mifilt=='failed'){ $customboton.= 'selected';}; $customboton.= ">".trans('Failed')."</option>\n";
$customboton.="</select>
             </div>\n";
$grid->add_custom_toolbar($customboton);


$grid->set_condition($condstring);

$fieldname = Array();
$fieldname[]=trans('Date');
$fieldname[]=trans('Direction');
$fieldname[]=trans('Number');
$fieldname[]=trans('Dur.');
$fieldname[]=trans('Billsec');
$fieldname[]=trans('Disposition');
$fieldname[]=trans('clid');
$fieldname[]=trans('src');
$fieldname[]=trans('dst');
$fieldname[]=trans('dcontext');
$fieldname[]=trans('channel');
$fieldname[]=trans('dstchannel');
$fieldname[]=trans('lastapp');
$fieldname[]=trans('lastdata');
$fieldname[]=trans('amaflags');
$fieldname[]=trans('accountcode');
$fieldname[]=trans('userfield');
$fieldname[]=trans('did');
$fieldname[]=trans('recordingfile');
$fieldname[]=trans('cnum');
$fieldname[]=trans('cnam');
$fieldname[]=trans('outbound_cnum');
$fieldname[]=trans('outbound_cnam');
$fieldname[]=trans('dst_cnam');
$grid->set_display_name( array('calldate','direction','number','duration','billsec','disposition', 'clid', 'src', 'dst', 'dcontext', 'channel', 'dstchannel', 'lastapp', 'lastdata', 'amaflags', 'accountcode', 'userfield', 'did', 'recordingfile', 'cnum', 'cnam', 'outbound_cnum', 'outbound_cnam', 'dst_cnam'), $fieldname);

$grid->set_nocheckbox(true);
$grid->allow_view(false);
$grid->allow_edit(false);
$grid->allow_delete(false);
$grid->allow_add(false);
$grid->allow_export(false);
$grid->allow_import(false);
$grid->allow_search(true);
$grid->set_orderby("calldate");
$grid->set_orderdirection("DESC");
$grid->set_search_fields(array('src','dst','calldate','clid'));

$grid->add_display_filter('disposition','dispoColor');

$grid->add_display_filter('number','clickdial');

$grid->add_display_filter('calldate','elapsedtime');

$grid->show_grid();

function dispoColor($dispo) {
   $color=array();
   $color['ANSWERED']="<span style='color: green;'>".trans($dispo)."</span>";
   $color['NO ANSWER']="<span style='color: red;'>".trans($dispo)."</span>";
   $color['FAILED']="<span style='color: red;'>".trans($dispo)."</span>";
   $color['BUSY']="<span style='color: orange;'>".trans($dispo)."</span>";
   if(isset($color[$dispo])) {
      return $color[$dispo];
   } else {
      return $dispo;
   }
}

function downloadfile($filename) {
   $hash=md5($_SESSION[MYAP]['key']);
   return "<div id='$filename' class='playicon' title='Play' onclick='playVmail(\"$hash\",\"$filename\",\"$filename\")'><img src='images/pixel.gif' width=16 height=16 alt='pixel' border='0' /></div><div onclick='javascript:downloadVmail(\"$hash\",\"$filename\");' class='downloadicon' title='Download' id='downloadvm_$filename'><img src='images/pixel.gif' width=16 height=16 alt='pixel' border='0' /></div>";
}

function clickdial($number) {
   $partes = preg_split("/!/",$number);
   $onlynumber = $partes[0];
   $clidname = $partes[1];

   $numberstrip = preg_replace("/[^0-9]\*/","",$onlynumber);

   if($_REQUEST['filterdir']=='outbound') {
       return "<div style='height:1.5em;'><a title='$numberstrip' onclick='parent.dial(\"$numberstrip\"); return false;'>$numberstrip</a></div>";
   } else {
       return "<div style='height:1.5em;'><a title='$clidname' onclick='parent.dial(\"$numberstrip\"); return false;'>$clidname</a></div>";
   }

}


function elapsedtime($date) {
    $fulldate = date('r',$date);
    $agostring = humanTiming($date);
    return '<span title="'.$fulldate.'">'.$agostring.'</span>';
}

function humanTiming ($time)
{

    $time = time() - $time; // to get the time since that moment

    $tokens = array (
        31536000 => 'year',
        2592000 => 'month',
        604800 => 'week',
        86400 => 'day',
        3600 => 'hour',
        60 => 'minute',
        1 => 'second'
    );

    foreach ($tokens as $unit => $text) {
        if ($time < $unit) continue;
        $numberOfUnits = floor($time / $unit);
        return $numberOfUnits.' '.$text.(($numberOfUnits>1)?'s':'')." ago";
    }

}


?>
<form id='dloadfrm' method='post'><input type=hidden id='file' name='file'/></form>
<script>
function setAllTips() {

    debug('set all tips');

    $('[title!=""]').qtip({
        position: {
            my: 'top left',
            at: 'bottom left',
            adjust: {
                screen: true
            },
            viewport: $(window)
        },
        show: {
            effect: function(offset) {
                $(this).slideDown(100);
            }
        },
        style: {
            tip: {
                corner: false
            },
            classes: 'qtip-rounded qtip-shadow'
        }
    });
}

jQuery(document).ready(function($) {
setAllTips();
});
</script>
</body>
</html>
