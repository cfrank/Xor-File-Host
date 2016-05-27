<?hh
    include_once 'includes/settings.php';
    /*
     * Try to find an album id.
     * Need to check the db for a unique id
     * which will then be used to create an album
     */
    function obtain_album_id(): string{
        $db =& $GLOBALS['db'];
        $id = null;

        for($i = 0; $i < XOR_ID_MAX_TRIES; ++$i){
            $id = get_id();
            $query = $db->prepare('SELECT COUNT(id) FROM album WHERE id = (:id)');
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
     * Create a psuedo random string to use as the album id
     */
    function get_id(): string{
        $id_length = XOR_ALBUM_ID_LENGTH;
        $keyspace = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $keyspace_length = strlen($keyspace);
        $id = '';
        for($i = 0; $i < $id_length; ++$i){
            $index_random = mt_rand(0, $keyspace_length - 1);
            $id .= $keyspace[$index_random];
        }
        return $id;
    }

    /*
     * Once an available albumn ID has been found add it to
     * the database so it can't be used again
     */
    function save_album_id(string $id): void{
        $db =& $GLOBALS['db'];
        $query = $db->prepare('INSERT INTO album (id) VALUES (:id)');
        $query->bindValue(':id', $id, PDO::PARAM_STR);
        $query->execute();
    }