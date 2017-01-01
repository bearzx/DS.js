javascript: (
    function () {
        var css = document.createElement('link');
        css.setAttribute('href', 'http://localhost/~bearzx/ds.js/out/ds.js.css');
        css.setAttribute('rel', 'stylesheet');
        document.head.appendChild(css);        
        var acejs = document.createElement('script');
        acejs.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js');
        document.body.appendChild(acejs);
        var bundlejs = document.createElement('script');
        bundlejs.setAttribute('src', 'http://localhost/~bearzx/ds.js/out/bundle.js');
        document.body.appendChild(bundlejs);        
    } ()
);