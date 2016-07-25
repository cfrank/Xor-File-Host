<?hh
    include_once 'utils/get_album_files.php';
    include_once 'includes/settings.php';
    include_once 'views/file.php';

    /*
     * An XHP tag which contains the container of the images which
     * are listed on the album page
     */
    class :xor:imagecontainer extends :x:element{
        category %flow;

        protected string $tagName = 'xor:imagecontainer';

        /*
         * Query the database and obtain image urls
         */
        protected function get_images_from_album(): :ul{
            try{
                $files = get_album_files();
                $files_div = <ul class="image-list"></ul>;

                /* Loop through the files and add them to the page */
                foreach($files as $file){
                    $file_is_image = $this->is_image($file);
                    $files_div->appendChild(
                        <xor:file filesrc={$file} isimage={$file_is_image} />
                    );
                }
                return $files_div;
            }
            catch(Exception $e){
                //header('Location: '. XOR_URL, true, 302);
                var_dump($e);
                exit(1);
            }
        }

        /*
         * Check if the file can be rendered as an image.
         * Return 1 if true
         * Return 0 if false
         *
         * XHP doesn't like boolean attributes so int values are better
         */
        protected function is_image(string $file): int{
            $image_ext = array("jpg", "jpeg", "gif", "png", "apng", "svg", "bmp", "tiff");
            $file_ext = explode('.', $file)[1];

            if (in_array($file_ext, $image_ext)){
                return 1;
            }
            else{
                return 0;
            }
        }

        protected function render(): XHPRoot{
            return
                <div class="image-container">
                    {$this->get_images_from_album()}
                </div>;
        }
    }