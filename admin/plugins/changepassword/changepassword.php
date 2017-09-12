<?php
require_once("../../../config.php");
require_once("../../asmanager.php");
require_once("../../functions.php");
$astman = new AsteriskManager();

$conf=array();
if(is_file("/usr/local/fop2/fop2.cfg") || is_file("/etc/asterisk/fop2/fop2.cfg")) {
   if(is_file("/usr/local/fop2/fop2.cfg")) {
       $fop2conf = parse_conf("/usr/local/fop2/fop2.cfg");
   }
   if(is_file("/etc/asterisk/fop2/fop2.cfg")) {
       $fop2conf = parse_conf("/etc/asterisk/fop2/fop2.cfg");
   }
   if(isset($fop2conf['manager_port'])) {
       $conf['MGRPORT']=$fop2conf['manager_port'];
   } else {
       $conf['MGRPORT']=5038;
   }
   if(isset($fop2conf['manager_user'])) {
       $conf['MGRUSER']=$fop2conf['manager_user'];
   } else {
       $conf['MGRUSER']=5038;
   }
   if(isset($fop2conf['manager_host'])) {
       $conf['MGRHOST']=$fop2conf['manager_host'];
   } else {
       $conf['MGRHOST']='127.0.0.1';
   }
   if(isset($fop2conf['manager_secret'])) {
       $conf['MGRPASS']=$fop2conf['manager_secret'];
   } else {
       $conf['MGRPASS']=5038;
   }
}

$context   = $_SESSION[MYAP]['context'];
$extension = $_SESSION[MYAP]['extension'];
$clavevieja = $_POST['currentpassword'];
$clavenueva = $_POST['newpassword'];

if(!isset($_SESSION[MYAP]['extension'])) {
    die('ERROR');
}

$res = $db->consulta("SELECT context_id FROM fop2users LEFT JOIN fop2contexts ON context_id=fop2contexts.id WHERE exten='%s' AND secret='%s' AND (context is NULL or context='%s')",$extension,$clavevieja,$context);

if(!$resman = $astman->connect($conf["MGRHOST"].":".$conf["MGRPORT"], $conf["MGRUSER"] , $conf["MGRPASS"], 'off')) {
    unset($astman);
}

if($db->num_rows($res)>0) {

    while($row = $db->fetch_assoc($res)) {

        $contextid = $row['context_id'];
        $ros = $db->consulta("UPDATE fop2users SET secret='%s' WHERE exten='%s' AND (context_id='0' or context_id='%s')",$clavenueva,$extension,$contextid);

        if($astman) {
            if($context=='') { $context='GENERAL'; }
            $resman = $astman->UserEvent('FOP2CHANGEUSERPASSWORD',array('User'=>$extension,'Secret'=>$clavenueva,'Context'=>$context));
        }

    }
    echo "OK";
} else {
    echo "ERROR";
}
die();
