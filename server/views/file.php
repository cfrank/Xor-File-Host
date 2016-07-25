<?hh
    include_once 'includes/settings.php';
    /*
     * An XHP tag which provides all the head info for the albums page
     */
    class :xor:file extends :x:element{
        category %flow;

        attribute 
            string filesrc,
            int isimage;

        protected string $tagname = 'xor:file';

        protected function render_file(): :a{
            if($this->getAttribute('isimage') === 1){
                return
                    <a href={XOR_FILE_URL.$this->getAttribute('filesrc')} target="_blank">
                        <img src={XOR_FILE_URL.$this->getAttribute('filesrc')} />
                    </a>;
            }
            else{
                return
                    <a href={XOR_FILE_URL.$this->getAttribute('filesrc')} class="file_not_image" target="_blank">
                        <span class="hide">Download this file</span>
                    </a>;
            }
        }

        protected function render(): XHPRoot{
            return
                <li class="file">
                    {$this->render_file()}
                </li>;
        }
    }