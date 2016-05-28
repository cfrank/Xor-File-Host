<?hh
    /*
     * Create a psuedo random string to use as the album id
     */
    function get_id(int $length): string{
        $id_length = XOR_ALBUM_ID_LENGTH;
        $keyspace = XOR_KEYSPACE;
        $keyspace_length = strlen($keyspace);
        $id = '';
        for($i = 0; $i < $id_length; ++$i){
            $index_random = mt_rand(0, $keyspace_length - 1);
            $id .= $keyspace[$index_random];
        }
        return $id;
    }