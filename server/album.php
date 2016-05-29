<?hh
    require('vendor/autoload.php');
    include_once 'views/head.php';
    include_once 'views/image_container.php';

    echo
    <x:doctype>
        <html>
            <xor:headmeta title="Xor - File Hosting | Album" />
            <body>
                <xor:imagecontainer />
            </body>
        </html>
    </x:doctype>;