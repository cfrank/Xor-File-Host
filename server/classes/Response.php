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
            $response = null;

            $response = json_encode(array(
                'success' => false,
                'errorcode' => $code,
                'description' => $message
            ));

            http_response_code($code);
            echo $response;
        }

        public function send(array $files): void{
            $response = null;

            $response = json_encode(array(
                'success' => true,
                'files' => $files
            ));

            http_response_code(200);
            echo $response;
        }
    }