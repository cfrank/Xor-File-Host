<?hh
    /*
     * Try to connect to the database
     */
    include_once 'settings.php';
    
    if(defined('PDO::ATTR_DRIVER_NAME')){
        try{
            $db = new PDO(XOR_DB_CONN, XOR_DB_USER, XOR_DB_PASS, $XOR_DB_OPTIONS);
        }
        catch(PDOException $e){
            echo 'There was a problem accessing the database.';
            if(PRODUCTION){
                echo '<br />';
                echo $e->getMessage();
            }
        }
    }else{
        echo 'No PDO driver installed';
    }