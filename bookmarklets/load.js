javascript: (
    function () {
        function bundle_load() {
            var css = document.createElement('link');
            /*css.setAttribute('href', 'http://cs.rochester.edu/~xzhang92/ds.js/out/ds.js.css');*/
            /* css.setAttribute('href', 'http://localhost/~bearzx/ds.js/out/ds.js.css'); */
            css.setAttribute('href', 'https://www.bearzx.com/ds.js/out/ds.js.css');
            css.setAttribute('rel', 'stylesheet');
            document.head.appendChild(css);

            var bundlejs = document.createElement('script');
            /*bundlejs.setAttribute('src', 'http://cs.rochester.edu/~xzhang92/ds.js/out/bundle.js');*/
            /* bundlejs.setAttribute('src', 'http://localhost/~bearzx/ds.js/out/bundle.js'); */
            bundlejs.setAttribute('src', 'https://www.bearzx.com/ds.js/out/bundle.js');
            document.body.appendChild(bundlejs);
        }

        function vega_load() {
            var vegajs = document.createElement('script');
            vegajs.onload = bundle_load;
            vegajs.setAttribute('src', 'https://vega.github.io/vega/vega.min.js');
            document.body.appendChild(vegajs);
        }

        function d3csv_load() {
            var d3dsvjs = document.createElement('script');
            d3dsvjs.onload = vega_load;
            d3dsvjs.setAttribute('src', 'https://d3js.org/d3-dsv.v1.min.js');
            document.body.appendChild(d3dsvjs);
        }

        var acejs = document.createElement('script');
        acejs.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js');
        document.body.appendChild(acejs);

        var d3js = document.createElement('script');
        d3js.onload = d3csv_load;
        d3js.setAttribute('src', 'https://d3js.org/d3.v3.min.js');
        document.body.appendChild(d3js);
    } ()
);