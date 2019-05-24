<!-- **Note: DS.js source code is still on its research prototype status (spaghetti-like code). Cleaning and documentation is on the way. Please contact the authors if you feel confused about any part of it.**

# DS.js Release TODOs
- [ ] Core code cleaning
- [ ] Loader code cleaning
- [ ] Example testing
- [ ] Compiled ds.js bookmarklet hosting
- [ ] Improved readme with API document
- [ ] Paper link -->

DS.js is a bookmarklet that converts any webpage with tabular datasets into an environment to learn basic Data Science programming. More details can be found in our UIST2017 research paper [DS.js: Turn Any Webpage into an Example-Centric Live
Programming Environment for Learning Data Science](http://www.pgbovine.net/publications/DSjs-turn-any-webpage-into-data-science-IDE_UIST-2017.pdf).

# Installation
Simply drag <a href="javascript: (    function() {        function js_load(url, cb) {            console.log(`loading ${url}`);            var js = document.createElement('script');            js.src = url;            if (cb) {                js.onload = cb;            }            document.body.appendChild(js);        }        function css_load(url, cb) {            var css = document.createElement('link');            css.setAttribute('href', url);            css.setAttribute('rel', 'stylesheet');            css.onload = cb;            document.head.appendChild(css);        }        sg_js_load = () => js_load('https://www.bearzx.com/ds.js/out/selectorgadget_combined.js');        sg_css_load = () => css_load('https://www.bearzx.com/ds.js/out/selectorgadget_combined.css', sg_js_load);        bundle_js_load = () => js_load('https://www.bearzx.com/ds.js/dist/bundle.js', sg_css_load);        bundle_css_load = () => css_load('https://www.bearzx.com/ds.js/out/ds.js.css', bundle_js_load);        vge_load = () => js_load('https://cdn.jsdelivr.net/npm/vega-embed@4', bundle_css_load);        vgl_load = () => js_load('https://cdn.jsdelivr.net/npm/vega-lite@3', vge_load);        vega_load = () => js_load('https://cdn.jsdelivr.net/npm/vega@5', vgl_load);        d3csv_load = () => js_load('https://d3js.org/d3-dsv.v1.min.js', vega_load);        d3_load = () => js_load('https://d3js.org/d3.v3.min.js', d3csv_load);        js_load('https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js', d3_load);    }());">this link</a> to your bookmark bar and you are all set.

# What you can do with DS.js
## Detect tabular datasets

## Program with table.js API

## Visualize data

## Share your code via URLs

# Demo Videos

# Example Pages

# License
MIT
