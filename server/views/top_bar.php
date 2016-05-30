<?hh
    include_once 'settings.php';

    class :xor:topbar extends :x:element{
        category %flow;

        protected string $tagName = 'xor:topbar';

        protected function render(): XHPRoot{
            $colors = array(
                'yellow',
                'green',
                'blue'
            );
            $index = rand(0,2);
            $class = "top-bar ".$colors[$index];
            return
                <div class={$class}>
                    <a class="go-home" href={XOR_URL} />
                </div>;

        }
    }