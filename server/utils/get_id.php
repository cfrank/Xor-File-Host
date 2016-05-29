<?hh
    /*
     * Create a psuedo random string to use as the album id
     */
    function get_id(int $length): string{
        $keyspace = XOR_KEYSPACE;
        $keyspace_length = strlen($keyspace);
        $id = '';
        for($i = 0; $i < $length; ++$i){
            $index_random = mt_rand(0, $keyspace_length - 1);
            $id .= $keyspace[$index_random];
        }
        return $id;
    }