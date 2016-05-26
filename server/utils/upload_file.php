<?hh
    include_once 'includes/database.inc.php';
    include_once 'classes/UploadedFile.php';
    include_once 'classes/UploadFileException.php';

    function upload_file(UploadedFile $file): array<string, mixed>{
        $db =& $GLOBALS['db'];

        /* Check for any file errors */
        if($file->error){
            throw new UploadException($file->error);
        }

        $query = $db->prepare('SELECT * FROM files');
        $query->execute();
        $result = $query->fetch();
        var_dump($query);
        return array(
            'result' => $result
        );

    }