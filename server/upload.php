<?hh
    // Check if we can gzip our output
    if(!ob_start(ob_gzhandler)){
        ob_start();
    }

    include_once 'includes/settings.php';
    include_once 'includes/database.inc.php';