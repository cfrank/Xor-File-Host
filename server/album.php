<?hh
    require('vendor/autoload.php');
    include_once 'views/head.php';
    include_once 'views/body.php';

    echo
    <x:doctype>
        <html>
            {$head}
            {$body}
        </html>
    </x:doctype>;