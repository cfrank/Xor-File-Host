<?hh
    class UploadException extends Exception{
        public function __construct(string $code): void{
            $message = $this->codeToMessage($code);
            // Super
            parent::__construct($message, 500);
        }

        /*
         * Switch through the error message
         * and return more user friendly error message
         */
        private function codeToMessage(string $code): string{
            switch($code){
            case UPLOAD_ERR_INI_SIZE:
                $message = 'The uploaded file exceeds the limit set in php.ini';
                break;
            case UPLOAD_ERR_FORM_SIZE:
                $message = 'The file size specified in the HTML for was exceeded';
                break;
            case UPLOAD_ERR_PARTIAL:
                $message = 'The uploaded file was only partially uploaded';
                break;
            case UPLOAD_ERR_NO_FILE:
                $message = 'No file was uploaded';
                break;
            case UPLOAD_ERR_NO_TMP_DIR:
                $message = 'Missing temp folder';
                break;
            case UPLOAD_ERR_CANT_WRITE:
                $message = 'Failed to write file to disk';
                break;
            case UPLOAD_ERR_EXTENSION:
                $message = 'Extension stopped the file upload';
                break;
            default:
                $message = 'Unknown error while uploading the file';
            }

            return $message;
        }
    }