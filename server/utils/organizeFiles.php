<?hh
    include_once 'classes/UploadedFile.php';

    /*
     * Normalize the array so that it is an array of files
     * and not an array of information about files
     */
    function normalize_files(array<string, array<mixed>> $files): array<int, array<string,mixed>>{
        $result = array();
        foreach($files as $arg => $val){
            foreach($val as $new_arg => $new_val){
                $result[$new_arg][$arg] = $new_val;
            }
        }
        return $result;
    }

    /*
     * Organize the files into a class which will hold
     * the file in a more reasonable and extendable way
     */
    function organize_files(array<string, array<mixed>> $files): array<UploadedFile>{
        $files = normalize_files($files);
        $length = count($files);
        $result = array();

        for($i = 0; $i < $length; ++$i){
            $File = new UploadedFile();
            $File->name = $files[$i]['name'];
            $File->type = $files[$i]['type'];
            $File->temp = $files[$i]['tmp_name'];
            $File->error = $files[$i]['error'];
            $File->size = $files[$i]['size'];

            // Add the file to the array
            $result[] = $File;
        }

        return $result;
    }