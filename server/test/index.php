<?hh
    if(isset($_GET['hello'])){
        echo $_GET['hello'];
    }

    if(isset($_GET['file'])){
        echo 'File = ' . $_GET['file'];
    }