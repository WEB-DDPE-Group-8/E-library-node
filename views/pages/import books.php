<?php

require_once '../models/bookmodel.php';

$bookModel = new BookModel();

?>

<script src="../js/jquery-3.2.1.min.js" defer></script>
<script type="text/javascript" defer>
    function validateFile() {
        var csvInputFile = document.forms["frmCSVImport"]["file"].value;
        if (csvInputFile == "") {
            error = "No source found to import";
            $("#response2").html(error).addClass("error");
            return false;
        }
        return true;
    }
</script>



<?php

if (isset($_POST["import_book"]))
    {
        $response = $bookModel->readBookRecords();
        unset($_POST["import_book"]);
    }   
?>
<script type="text/javascript">
    function validateFile() {
        var csvInputFile = document.forms["frmCSVImportBook"]["file"].value;
        if (csvInputFile == "") {
            error = "No source found to import";
            $("#response").html(error).addClass("error");
            return false;
        }
        return true;
    }
</script>

<!-- <h2>Import Book CSV file into Mysql using PHP</h2> -->
<div class="outer-scontainer">
    <div class="row">
        <form class="form-horizontal" action="" method="post" name="frmCSVImportBook" id="frmCSVImportBook"
            enctype="multipart/form-data" onsubmit="return validateFile()">
            <div Class="input-row">
                <input type="file" name="file" id="file" class="file" accept=".csv,.xls,.xlsx">
                <div class="import">
                    <button type="submit" id="submit" name="import_book" class="btn">Import</button>
                </div>
            </div>
        </form>
    </div>
</div>



<div id="response" class="<?php if(!empty($response["type"])) { echo $response["type"] ; } ?>">
    <?php if(!empty($response["message"])) { echo $response["message"]; } ?>
</div>