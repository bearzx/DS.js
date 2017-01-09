javascript: (
    function () {
        var css = document.createElement('link');
        css.setAttribute('href', 'http://localhost/~bearzx/ds.js/out/ds.js.css');
        css.setAttribute('rel', 'stylesheet');
        document.head.appendChild(css);
        var bundlejs = document.createElement('script');
        bundlejs.setAttribute('src', 'http://localhost/~bearzx/ds.js/out/bundle.js');
        document.body.appendChild(bundlejs);        
    } ()
);