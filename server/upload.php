<?hh
    session_start();

    include_once 'includes/settings.php';
    include_once 'classes/Response.php';
    include_once 'utils/organizeFiles.php';
    include_once 'utils/upload_file.php';
    include_once 'utils/obtain_album_id.php';

    if(!PRODUCTION && $_SERVER['REQUEST_METHOD'] === 'GET'){
        echo 'Only POST requests are accepted';
        fwrite(STDERR, "Only POST requests are accepted");
        exit(1);
    }

    /*
     * Get the files from the form
     */
    $response = new Response();
    
    if(isset($_FILES['files'])){
        $uploads = organize_files($_FILES['files']);
        $files_length = count($uploads);
        $result = array();
        $album_id = null;
        if($files_length > 1){
            /* We need to create an album */
            try{
                $album_id = obtain_album_id();
            }
            catch(Exception $e){
                $response->error($e->getCode(), $e->getMessage());
                return false;
            }
        }
        try{
            for($i = 0; $i < $files_length; ++$i){
                $result[] = upload_file($uploads[$i], $album_id);
            }
            /* Moved all files onto server now to respond with link */
            $response->send($result);
        }
        catch(Exception $e){
            $response->error($e->getCode(), $e->getMessage());
            return false;
        }
    }
    else{
        $response->error(400, 'No input file(s)!');
        return false;
    }

    // Null out the database
    $db =& $GLOBALS['db'];
    $db = null;