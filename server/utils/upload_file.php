<?hh
    include_once 'includes/database.inc.php';
    include_once 'classes/UploadedFile.php';
    include_once 'classes/UploadFileException.php';

    function upload_file(UploadedFile $file, ?string $album_id): array<string, mixed>{
        $db =& $GLOBALS['db'];

        /* Check for any file errors */
        if($file->error){
            throw new UploadException($file->error);
        }
        else{
            return array(
                'hello' => 'hello'
            );
        }
    }