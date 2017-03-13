javascript: (
    function () {
        function bundle_load() {
            var css = document.createElement('link');
            /* css.setAttribute('href', 'http://cs.rochester.edu/~xzhang92/ds.js/out/ds.js.css'); */
            /* css.setAttribute('href', 'http://localhost/~bearzx/ds.js/out/ds.js.css'); */
            css.setAttribute('href', 'https://www.bearzx.com/ds.js/out/ds.js.css');
            css.setAttribute('rel', 'stylesheet');
            document.head.appendChild(css);

            var bundlejs = document.createElement('script');
            /*bundlejs.setAttribute('src', 'http://cs.rochester.edu/~xzhang92/ds.js/out/bundle.js');*/
            /*bundlejs.setAttribute('src', 'http://localhost/~bearzx/ds.js/out/bundle.js');*/
            bundlejs.setAttribute('src', 'https://www.bearzx.com/ds.js/out/bundle.js');
            bundlejs.onload = sg_load;
            document.body.appendChild(bundlejs);
        }

        function sg_load() {
            var sgcss = document.createElement('link');
            /*sgcss.setAttribute('href', 'http://localhost/~bearzx/ds.js/libs/selector-gadget/selectorgadget_combined.css');*/
            sgcss.setAttribute('href', 'https://www.bearzx.com/ds.js/out/selectorgadget_combined.css');
            sgcss.setAttribute('rel', 'stylesheet');
            document.head.appendChild(sgcss);

            var sgjs = document.createElement('script');
            /*sgjs.setAttribute('src', 'http://localhost/~bearzx/ds.js/libs/selector-gadget/selectorgadget_combined.js');*/
            sgjs.setAttribute('src', 'https://www.bearzx.com/ds.js/out/selectorgadget_combined.js');
            /* sgjs.onload = bundle_load; */
            document.body.appendChild(sgjs);
        }

        function vega_load() {
            var vegajs = document.createElement('script');
            /*vegajs.onload = bundle_load;*/
            vegajs.onload = vgl_load;
            vegajs.setAttribute('src', 'https://www.bearzx.com/ds.js/out/vega.js');
            /*vegajs.setAttribute('src', 'http://localhost/~bearzx/ds.js/tmp/vega/vega.js');*/
            document.body.appendChild(vegajs);
        }

        function vgl_load() {
            var vgljs = document.createElement('script');
            vgljs.onload = vge_load;
            vgljs.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/vega-lite/1.3.1/vega-lite.js');
            document.body.appendChild(vgljs);
        }

        function vge_load() {
            var vgejs = document.createElement('script');
            vgejs.onload = bundle_load;
            vgejs.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/vega-embed/2.2.0/vega-embed.js');
            document.body.appendChild(vgejs);
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