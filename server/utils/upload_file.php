<?hh
    include_once 'includes/database.inc.php';
    include_once 'classes/UploadedFile.php';
    include_once 'classes/UploadFileException.php';
    include_once 'utils/obtain_file_id.php';

    function upload_file(UploadedFile $file, ?string $album_id): string{
        $db =& $GLOBALS['db'];

        /* Check for any file errors */
        if($file->error){
            return strval($file->error);
        }

        return get_file_ext($file->name);
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
                return strrev($doubledot);
            }
        }

        return $file_ext;
    }