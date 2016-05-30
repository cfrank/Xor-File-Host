<?hh
    include_once 'includes/database.inc.php';
    include_once 'includes/settings.php';
    include_once 'utils/organizeFiles.php';

    function get_album_files(): array<string>{
        $db =& $GLOBALS['db'];
        $album_id = $_GET['albumid']; /* The requested album id */
        $files = array();

        /* Make sure the id is valid */
        if(strlen($album_id) === XOR_ALBUM_ID_LENGTH){
            /* Get a list of files */
            $query = $db->prepare('SELECT * FROM files WHERE albumid = '.
                            '(:albumid)');
            $query->bindValue(':albumid', $album_id, PDO::PARAM_STR);
            $query->execute();
            $result = $query->fetchAll();

            /* Check to see if the query returned anything */
            if(count($result) > 0){
                /* Organize the result into more manageable files array */
                for($i = 0; $i < count($result); ++$i){
                    $files[] = $result[$i]['filename'];
                }

                return $files;
            }
            else{
                throw new Exception('Could not find any files with this Album ID', 500);
            }
        }
        else{
            throw new Exception('Album ID is not valid!', 500);
        }
    }