<?hh
    session_start();

    include_once 'includes/settings.php';
    include_once 'classes/Response.php';
    include_once 'utils/organizeFiles.php';
    include_once 'utils/upload_file.php';

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
        try{
            for($i = 0; $i < $files_length; ++$i){
                $res[] = upload_file($uploads[$i]);
            }
            $response->send($res);
        }
        catch(Exception $e){
            $response->error($e->getCode(), $e->getMessage());
        }
    }
    else{
        $response->error(400, 'No input file(s)!');
    }

    // Null out the database
    $db = null;