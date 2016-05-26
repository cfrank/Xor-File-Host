<?hh
    session_start();

    include_once 'includes/settings.php';
    include_once 'includes/database.inc.php';
    include_once 'classes/Response.php';
    include_once 'utils/organizeFiles.php';

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
        var_dump(organize_files($_FILES['files']));
    }
    else{
        $response->error(400, 'No input file(s)!');
    }

    // Null out the database
    $db = null;