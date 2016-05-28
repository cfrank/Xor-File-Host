<?hh
    // Includes information which is private and should not be in VC
    include_once 'private.inc.php';
    /*
     * Settings which will be used by the application
     */

    define('PRODUCTION', true);

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

    // URL For Images
    define('XOR_URL', 'https://xor.al/f/');