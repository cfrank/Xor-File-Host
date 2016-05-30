<?hh
    include_once 'utils/get_album_files.php';
    include_once 'settings.php';
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
                    $files_div->appendChild(
                        <xor:file filesrc={$file} />
                    );
                }
                return $files_div;
            }
            catch(Exception $e){
                header('Location: '. XOR_URL, true, 302);
                exit(1);
            }
        }

        protected function render(): XHPRoot{
            return
                <div class="image-container">
                    {$this->get_images_from_album()}
                </div>;
        }
    }