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

# DS.js Workflow
## Detect Tabular Datasets
Simply click on the DS.js bookmarklet to put DS.js environments under csv/tsv links or HTML tables.
![Open DS.js](imgs/open-dsjs.gif)

## Program with table.js API
Manipulate the parsed datasets with dataframe style programming APIs.
> GIF here

## Visualize Data
Create visualizations with table.js, which wraps vega APIs.
> GIF here

## Preview from Code to Data or vice versa
Get hints about the usage of table.js APIs with previews.
> GIF here

## Share your code via URLs
Copy the URL of the webpage with capsulated DS.js code and send it to others to share your work.
> GIF here

# table.js APIs
> TODO

# Demo Vlogs
> TODO

# Example Pages
A made-up webpage with example code to show the table.js APIs can be found [here](https://www.bearzx.com/ds.js/samples/demo.html?dsjs%5B0-0%5D%5Bcode%5D=t0%3B%20%2F%2F%20This%20table%20is%20denoted%20as%20t0%0At0.num_rows()%3B%0At0.num_columns()%3B%0At0.get_row(50)%3B%0At0.get_column(%27PLAYER%27)%3B%0At0.get_element(10%2C%20%27POSITION%27)%3B%0At0.get_column_names()%3B%0At0.sample_n_random_rows(10)%3B%0A%0At0.add_row(%7B%22RANK%22%3A101%2C%22PLAYER%22%3A%22Jason%20Thompson%22%2C%22POSITION%22%3A%22PF%22%2C%22TEAM%22%3A%22Golden%20State%20Warriors%22%2C%22SALARY(M)%22%3A7.008475%7D)%3B%0At0.add_column(%27Blah%27%2C%20%5B1234%5D)%3B%0At0.rename_column(%27POSITION%27%2C%20%27PLAYER%20POSITION%27)%3B%0At0.select_columns(%27RANK%27%2C%20%27PLAYER%27)%3B%0At0.drop_columns(%27SALARY(M)%27)%3B%0At0.sorted(%27SALARY(M)%27)%3B%0At0.where(%27POSITION%27%2C%20x%20%3D%3E%20x%20%3D%3D%20%27SF%27)%3B%0At0.groupby(%27POSITION%27)%3B%0At0_1%20%3D%20t0.select_columns(%27RANK%27%2C%20%27PLAYER%27%2C%20%27POSITION%27)%3B%0At0_2%20%3D%20t0.drop_columns(%27RANK%27%2C%20%27POSITION%27)%3B%0At0_1.join(%27PLAYER%27%2C%20t0_2%2C%20%27PLAYER%27)%3B%0At0.pivot(%27POSITION%27%2C%20%27TEAM%27%2C%20%27SALARY(M)%27%2C%20d3.mean)%3B%0A%0At0.lineplot(%27RANK%27%2C%20%27SALARY(M)%27)%3B%0At0.scatterplot(%27RANK%27%2C%20%27SALARY(M)%27)%3B%0At0.groupby(%27TEAM%27).barplot(%27TEAM%27%2C%20%27count%27%2C%20%27nominal%27)%3B%0At0.histogram(%27SALARY(M)%27%2C%2030)%3B%0At0.boxplot(%27SALARY(M)%27%2C%20%27POSITION%27)%3B%0A&dsjs%5B0-0%5D%5Bcrow%5D=26&dsjs%5B0-0%5D%5Bccol%5D=0).

# License
MIT
