javascript: (
    function () {
        var css = document.createElement('link');
        css.setAttribute('href', 'http://localhost/~bearzx/ds.js/out/ds.js.css');
        css.setAttribute('rel', 'stylesheet');
        document.head.appendChild(css);
                
        var d3js = document.createElement('script');
        d3js.setAttribute('src', 'https://d3js.org/d3.v3.min.js');
        document.body.appendChild(d3js);

        var vegajs = document.createElement('script');
        vegajs.setAttribute('src', 'https://vega.github.io/vega/vega.min.js');
        document.body.appendChild(vegajs);

        var bundlejs = document.createElement('script');
        bundlejs.setAttribute('src', 'http://localhost/~bearzx/ds.js/out/bundle.js');
        document.body.appendChild(bundlejs);
    } ()
);