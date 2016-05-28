<?hh
    include_once 'includes/settings.php';
    include_once 'includes/database.inc.php';
    include_once 'utils/get_id.php';
    /*
     * Try to find an album id.
     * Need to check the db for a unique id
     * which will then be used to create an album
     */
    function obtain_album_id(): string{
        $db =& $GLOBALS['db'];
        $id = null;

        for($i = 0; $i < XOR_ID_MAX_TRIES; ++$i){
            $id = get_id(XOR_ALBUM_ID_LENGTH);
            $query = $db->prepare('SELECT COUNT(id) FROM albumids WHERE id = (:id)');
            $query->bindValue(':id', $id, PDO::PARAM_STR);
            $query->execute();
            $result = $query->fetchColumn();
            if($result == 0){
                save_album_id($id);
                return $id;
            }
        }

        throw new Exception('Gave up trying to find album ID', 500);
    }

    /*
     * Once an available albumn ID has been found add it to
     * the database so it can't be used again
     */
    function save_album_id(string $id): void{
        $db =& $GLOBALS['db'];
        $query = $db->prepare('INSERT INTO albumids (id) VALUES (:id)');
        $query->bindValue(':id', $id, PDO::PARAM_STR);
        $query->execute();
    }