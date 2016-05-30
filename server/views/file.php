<?hh
    include_once 'includes/settings.php';
    /*
     * An XHP tag which provides all the head info for the albums page
     */
    class :xor:file extends :x:element{
        category %flow;

        attribute
            string filesrc @required;

        protected string $tagname = 'xor:file';

        protected function render(): XHPRoot{
            return
                <li class="file">
                    <a href={XOR_BUILD_FILE_URL.$this->getAttribute('filesrc')}>
                        <img src={XOR_BUILD_FILE_URL.$this->getAttribute('filesrc')} />
                    </a>
                </li>;
        }
    }