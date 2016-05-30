<?hh
    /*
     * Class for returning content to the user
     * Provides methods for sending content and errors
     */
    class Response{
        public function __construct (): void{
            header('Content-Type: text/plain; charset=UTF-8');
        }

        public function error(int $code, string $message): void{
            $response_error = null;

            $response_error = json_encode(array(
                'success' => false,
                'errorcode' => $code,
                'description' => $message
            ));

            http_response_code($code);
            echo $response_error;
        }

        public function send(array $files): void{
            $response_success = null;

            $response_success = json_encode(array(
                'success' => true,
                'files' => $files
            ));

            http_response_code(200);
            echo $response_success;
        }

        public function return_url(string $url): void{
            $response_url = null;

            $response_url = json_encode(array(
                'success' => true,
                'url' => $url
            ));

            http_response_code(200);
            echo $response_url;
        }
    }