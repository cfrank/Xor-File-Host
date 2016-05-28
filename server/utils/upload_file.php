<?hh
    include_once 'includes/database.inc.php';
    include_once 'classes/UploadedFile.php';
    include_once 'classes/UploadFileException.php';
    include_once 'utils/get_id.php';

    function upload_file(UploadedFile $file, ?string $album_id): string{
        $db =& $GLOBALS['db'];

        /* Check for any file errors */
        if($file->error){
            return strval($file->error);
        }

        /*
         * This is one of the only variables which come from
         * the user and will be put into the database
         * so caution should be taken to make sure nothing fishy happens
         */
        $file_ext = get_file_ext($file->name);

        /* Create a file id (.php) */
        $file_name = obtain_file_name($file, $file_ext);

        /* Upload the file */
        
        return $file_name;
    }

    /*
     * Get the extension of the file.
     * Also checks to see if the file is a double dot extension
     * and if it is it returns the correct file extension
     */
    function get_file_ext(string $full_file_name): string{
        $file_info = new SplFileInfo($full_file_name);
        $file_ext = $file_info->getExtension();
        $file_name = $file_info->getFilename();

        $doubledots_list = Vector{
            'tar.gz',
            'tar.bz',
            'tar.bz2',
            'tar.xz',
            'user.js'
        };

        $doubledots = $doubledots_list->map($dd ==> strrev($dd));

        $reverse_filename = strrev($file_name);
        foreach($doubledots as $doubledot){
            if(stripos($reverse_filename, $doubledot) === 0){
                return '.' . strrev($doubledot);
            }
        }

        /* The file ext is not a double dot ext */
        if(strlen($file_ext) > 0){
            $file_ext = '.' . strip_tags($file_ext);
        }

        return $file_ext;
    }

    /*
     * Try to find a non existing file ID in the database
     * if there is than obtain a new file ID and check that
     * one up to XOR_ID_MAX_TRIES
     */
    function obtain_file_name(UploadedFile $file, string $file_ext): string{
        $db =& $GLOBALS['db'];
        $filename = null;

        for($i = 0; $i < XOR_ID_MAX_TRIES; ++$i){
            /* Create the full file name with extension and id */
            $filename = get_id(XOR_FILE_ID_LENGTH) . $file_ext;
            $query = $db->prepare('SELECT COUNT(filename) FROM files WHERE ' .
                        'filename = (:filename)');
            $query->bindValue(':filename', $filename, PDO::PARAM_STR);
            $query->execute();
            $result = $query->fetchColumn();
            if($result == 0){
                return $filename;
            }
        }
        throw new Exception('Gave up trying to find file ID', 500);
    }