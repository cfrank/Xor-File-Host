<?hh
    // Includes information which is private and should not be in VC
    include_once 'private.inc.php';
    /*
     * Settings which will be used by the application
     */

    define('PRODUCTION', true);

    // Where to put uploaded files
    define('XOR_FILE_ROOT', '/var/www/xor.al/files/');
    define('XOR_ALBUM_URL', 'https://a.xor.al/');
    define('XOR_FILE_URL', 'https://f.xor.al/');

    // Database connection information
    define('XOR_DB_CONN', 'mysql:host=127.0.0.1;dbname=xor');

    // DB user and password
    define('XOR_DB_USER', 'xor');
    define('XOR_DB_PASS', DB_PASSWORD);
    // DB settings
    $XOR_DB_OPTIONS = array(
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES UTF8'
    );

    // ID Creation settings
    define('XOR_ID_MAX_TRIES', 5);
    define('XOR_KEYSPACE', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

    // Album settings
    define('XOR_ALBUM_ID_LENGTH', 10);

    // File settings
    define('XOR_FILE_ID_LENGTH', 10);