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
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
    );