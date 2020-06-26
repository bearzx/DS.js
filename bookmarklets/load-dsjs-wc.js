javascript: (
    function() {
        function js_load(url, cb) {
            console.log(`loading ${url}`);

            var js = document.createElement('script');
            js.type = 'module';
            js.src = url;
            if (cb) {
                js.onload = cb;
            }
            document.body.appendChild(js);
        }

        function css_load(url, cb) {
            var css = document.createElement('link');
            css.setAttribute('href', url);
            css.setAttribute('rel', 'stylesheet');
            css.onload = cb;
            document.head.appendChild(css);
        }

        /* js_load('http://0.0.0.0:8000/init.js'); */
        js_load('https://bearzx.com/ds.js/init.js');
    }()
);