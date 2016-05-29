<?hh
    class UploadedFile{
        public $name;
        public $type;
        public $temp;
        public $error;
        public $size;

        private $sha1;

        /* Get the SHA1 hash for the temp file */
        public function get_sha1(string $file_name): string{
            if(!$this->sha1){
                /* Need to set the hash */
                $this->sha1 = sha1_file($file_name);
                return $this->sha1;
            }

            return $this->sha1;
        }
    }