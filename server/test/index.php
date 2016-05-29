<?hh
    function test(string $hello, ?string $test){
        if(isset($test)){
            echo $test;
        }
    }

    test('hello', 'world');
    test('world', null);