<?php
/**
 * Created by PhpStorm.
 * User: Hyder
 * Date: 13/09/2017
 * Time: 10:15
 */

require_once("config.php");


$contacts = file_get_contents('contacts.json');


?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<style>
    p.success {
        color: green;
    }

    p.error {
        color: red;
    }

    pre {
        background-color: #cfcfcf;
        border: 1px solid #CFCDCD;
        padding: 20px;
    }
</style>
<body>
<h4><?php echo 'Voici les informations que nous avons trouvée sur l\'API'; ?></h4>


<?php

echo '<pre>' . $contacts . '</pre>';
echo '<br/>';
echo '<h4>Resultat:</h4>';
$contacts = json_decode($contacts);
foreach ($contacts->data as $contact) {

    $result = $db->consulta('INSERT INTO visual_phonebook (firstname,lastname,company,phone1,phone2,address,email,owner,private,context) VALUES ("%s","%s","%s","%s","%s","%s","%s","%s","%s","%s")',
        [
            $contact->firstname,
            $contact->lastname,
            $contact->company,
            $contact->phone1,
            $contact->phone2,
            $contact->address,
            $contact->email,
            $contact->extension,
            $contact->private,
            $contact->context,
        ]
    );

    ?>

    <?php
    if ($result) {
        echo "<p class='success'>Insertion du nom de contact:  <strong> $contact->firstname $contact->lastname</strong></p>";
    } else {
        echo "<p class='error'>Shit happened</p>";
    }

}
?>

</body>
</html>