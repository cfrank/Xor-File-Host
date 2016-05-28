<?hh
    include_once 'includes/settings.php';

    /*
     * Try to find a non existing file ID in the database
     * if there is than obtain a new file ID and check that
     * one up to XOR_ID_MAX_TRIES
     */
    function obtain_file_id(UploadedFile $file): string{
        return 'hello';
    }