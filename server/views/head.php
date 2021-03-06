<?hh
    /*
     * An XHP tag which provides all the head info for the albums page
     */
    class :xor:headmeta extends :x:element{
        category %flow;

        attribute
            string title @required;

        protected string $tagname = 'xor:headmeta';

        protected function render(): XHPRoot{
            $stylesheet = XOR_URL.'/assets/build/css/build.css';

            return
                <head>
                    <title>{$this->getAttribute('title')}</title>

                    <meta charset="utf-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="description" content="Easy file hosting without all the shit" />
                    <meta property="og:title" content="Xor al" />
                    <meta property="og:type" content="website" />
                    <meta property="og:description" content="Easy file hosting without all the shit" />
                    <meta property="og:url" content="https://xor.al" />
                    <meta property="og:site-name" content="Xor al" />

                    <link rel="stylesheet" type="text/css" href={$stylesheet} />
                </head>;
        }
    }