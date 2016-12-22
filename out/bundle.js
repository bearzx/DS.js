var Table =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var vgt = __webpack_require__(1);
	var Table = (function () {
	    function Table(t, l) {
	        this._t = [];
	        this._labels = [];
	        this._column_order = {};
	        if (t != null) {
	        }
	        if (l != null) {
	            this._labels = l.slice();
	        }
	    }
	    Table.prototype.read_table = function () {
	    };
	    Table.prototype.table_init = function () {
	        var _this = this;
	        this._labels = d3.keys(this._t[0]);
	        this._labels.forEach(function (item, index) {
	            _this._column_order[item] = index;
	        });
	        // console.log(this._column_order);
	    };
	    Table.prototype.read_table_csv_async = function (url, callback) {
	        var _this = this;
	        d3.csv(url, function (data) {
	            _this._t = data;
	            _this.table_init();
	            callback();
	        });
	    };
	    Table.prototype.read_table_csv_sync = function (url) {
	        var _this = this;
	        $.ajax({
	            dataType: "text",
	            url: url,
	            async: false,
	            success: function (data) {
	                _this._t = d3.csvParse(data);
	                _this.table_init();
	            }
	        });
	    };
	    Table.prototype.num_rows = function () {
	        return this._t.length;
	    };
	    Table.prototype.labels = function () {
	        // console.log(d3.keys(this._t[0]));
	        // return d3.keys(this._t[0]);
	        return this._labels;
	    };
	    Table.prototype.num_columns = function () {
	        // console.log(this._t[0]);
	        return Object.keys(this._t[0]).length;
	    };
	    Table.prototype.column_by_id = function (index) {
	        var col = [];
	        var column_name = this._labels[index];
	        this._t.forEach(function (row) {
	            col.push(row[column_name]);
	        });
	        return col;
	    };
	    Table.prototype.column_by_name = function (name) {
	        var col = [];
	        this._t.forEach(function (row) {
	            col.push(row[name]);
	        });
	        return col;
	    };
	    Table.prototype.columns = function () {
	        var _this = this;
	        var cols = [];
	        this._labels.forEach(function (label) {
	            cols.push(_this.column_by_name(label));
	        });
	        return cols;
	    };
	    Table.prototype.row = function (index) {
	        return this._t[index];
	    };
	    // return a view of all rows
	    Table.prototype.rows = function () {
	        return this._t;
	    };
	    Table.prototype.with_row = function (row) {
	        if (row instanceof Array) {
	            var o_row = {};
	            this._labels.forEach(function (label, index) {
	                o_row[label] = row[index];
	            });
	            this._t.push(o_row);
	        }
	        else if (row instanceof Object) {
	            this._t.push(row);
	        }
	        return this;
	    };
	    Table.prototype.with_rows = function (rows) {
	        var _this = this;
	        rows.forEach(function (row) {
	            _this.with_row(row);
	        });
	        return this;
	    };
	    Table.prototype.with_column = function (label, values) {
	        if (values.length == 1) {
	            for (var i = 0; i < this._t.length; i++) {
	                this._t[i][label] = values[0];
	            }
	        }
	        else if (values.length == this._t.length) {
	            for (var i = 0; i < this._t.length; i++) {
	                this._t[i][label] = values[i];
	            }
	        }
	        if (!this._labels.includes(label)) {
	            this._labels.push(label);
	        }
	        return this;
	    };
	    Table.prototype.with_columns = function () {
	        var labels_and_values = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            labels_and_values[_i - 0] = arguments[_i];
	        }
	        if (labels_and_values.length % 2 == 0) {
	            for (var i = 0; i < labels_and_values.length / 2; i++) {
	                this.with_column(labels_and_values[i * 2], labels_and_values[i * 2 + 1]);
	            }
	        }
	        return this;
	    };
	    Table.prototype.relabel = function (column_label, new_label) {
	        var index = this._labels.indexOf(column_label);
	        if (index != -1) {
	            this._labels[index] = new_label;
	            this._t.forEach(function (row) {
	                var val = row[column_label];
	                delete row[column_label];
	                row[new_label] = val;
	            });
	        }
	        return this;
	    };
	    Table.prototype.select = function () {
	        var column_label_or_labels = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            column_label_or_labels[_i - 0] = arguments[_i];
	        }
	        console.log(column_label_or_labels);
	        var _this = this;
	        var table = new Table();
	        for (var i = 0; i < this._t.length; i++) {
	            table.with_row({});
	        }
	        column_label_or_labels.forEach(function (label) {
	            table.with_column(label, _this.column_by_name(label));
	        });
	        return table;
	    };
	    Table.prototype.drop = function () {
	        var column_label_or_labels = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            column_label_or_labels[_i - 0] = arguments[_i];
	        }
	        var left_columns = this._labels.filter(function (c) {
	            return column_label_or_labels.indexOf(c) == -1;
	        });
	        return this.select.apply(this, left_columns);
	    };
	    Table.prototype.where = function (column_or_label, value_or_predicate) {
	        var table = new Table(null, this.labels());
	        var predicate;
	        if (value_or_predicate instanceof Function) {
	            predicate = value_or_predicate;
	        }
	        else {
	            predicate = function (a) { return a == value_or_predicate; };
	        }
	        this._t.forEach(function (row) {
	            if (predicate(row[column_or_label])) {
	                table.with_row(row);
	            }
	        });
	        return table;
	    };
	    Table.prototype.sort = function (column_or_label, descending, distinct) {
	        if (descending === void 0) { descending = false; }
	        if (distinct === void 0) { distinct = false; }
	        var compare = function (a, b) {
	            if (a[column_or_label] > b[column_or_label]) {
	                return 1;
	            }
	            else if (a[column_or_label] < b[column_or_label]) {
	                return -1;
	            }
	            else {
	                return 0;
	            }
	        };
	        if (descending) {
	            this._t.sort(function (a, b) {
	                return -compare(a, b);
	            });
	        }
	        else {
	            this._t.sort(function (a, b) {
	                return compare(a, b);
	            });
	        }
	        return this;
	    };
	    Table.prototype.group = function () {
	    };
	    Table.prototype.groups = function () {
	    };
	    Table.prototype.pivot = function () {
	    };
	    Table.prototype.join = function () {
	    };
	    Table.prototype.stats = function () {
	    };
	    Table.prototype.percentile = function () {
	    };
	    Table.prototype.sample = function () {
	    };
	    Table.prototype.sample_from_distribution = function () {
	    };
	    Table.prototype.split = function () {
	    };
	    Table.prototype.show = function () {
	        var _this = this;
	        var s = "<table>";
	        s += "<tr>";
	        this._labels.forEach(function (label) {
	            s += "<th>";
	            s += label;
	            s += "</th>";
	        });
	        s += "</tr>";
	        this._t.forEach(function (row) {
	            s += "<tr>";
	            // console.log(row);
	            _this._labels.forEach(function (label) {
	                s += "<td>";
	                s += row[label];
	                s += "</td>";
	            });
	            s += "</tr>";
	        });
	        // console.log(s);
	        // console.log($("#table-area").html(s));        
	        $("#table-area").html(s);
	    };
	    Table.prototype.plot = function () {
	    };
	    Table.prototype.bar = function () {
	    };
	    Table.prototype.scatter = function () {
	    };
	    Table.prototype.hist = function (column) {
	        var bins = {};
	        this._t.forEach(function (row) {
	            var elem = row[column];
	            if (elem.length != 0) {
	                if (elem in bins) {
	                    bins[elem] += 1;
	                }
	                else {
	                    bins[elem] = 1;
	                }
	            }
	        });
	        var data = [];
	        var xs = Object.keys(bins);
	        xs.sort(function (a, b) { return parseInt(a) - parseInt(b); });
	        // console.log(xs);
	        xs.forEach(function (x) {
	            data.push({ 'x': x, 'y': bins[x] });
	        });
	        // console.log(data);
	        var templates = new vgt.VGTemplate();
	        vg.parse.spec(templates.bar(data), function (error, chart) {
	            chart({ el: "#vis" }).update();
	        });
	    };
	    Table.prototype.vhist = function (column) {
	        var templates = new vgt.VGTemplate();
	        vg.parse.spec(templates.vbar(this._t), function (error, chart) {
	            chart({ el: "#vis" }).update();
	        });
	    };
	    Table.prototype.boxplot = function () {
	    };
	    return Table;
	}());
	exports.Table = Table;


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var VGTemplate = (function () {
	    function VGTemplate() {
	    }
	    VGTemplate.prototype.bar = function (_values) {
	        var x = {
	            "width": 400,
	            "height": 200,
	            "padding": { "top": 10, "left": 30, "bottom": 30, "right": 10 },
	            "signals": [
	                {
	                    "name": "tooltip",
	                    "init": {},
	                    "streams": [
	                        { "type": "rect:mouseover", "expr": "datum" },
	                        { "type": "rect:mouseout", "expr": "{}" }
	                    ]
	                }
	            ],
	            "data": [
	                {
	                    "name": "table",
	                    "values": _values
	                }
	            ],
	            "scales": [
	                {
	                    "name": "x",
	                    "type": "ordinal",
	                    "range": "width",
	                    "domain": { "data": "table", "field": "x" }
	                },
	                {
	                    "name": "y",
	                    "type": "linear",
	                    "range": "height",
	                    "domain": { "data": "table", "field": "y" },
	                    "nice": true
	                }
	            ],
	            "axes": [{ "type": "x", "scale": "x" }],
	            "marks": [
	                {
	                    "type": "rect",
	                    "from": { "data": "table" },
	                    "properties": {
	                        "enter": {
	                            "x": { "scale": "x", "field": "x" },
	                            "width": { "scale": "x", "band": true, "offset": -1 },
	                            "y": { "scale": "y", "field": "y" },
	                            "y2": { "scale": "y", "value": 0 }
	                        },
	                        "update": {
	                            "fill": [
	                                {
	                                    "test": "datum._id == tooltip._id",
	                                    "value": "red"
	                                },
	                                { "value": "steelblue" }
	                            ]
	                        }
	                    }
	                },
	                {
	                    "type": "text",
	                    "properties": {
	                        "enter": {
	                            "align": { "value": "center" },
	                            "fill": { "value": "#333" }
	                        },
	                        "update": {
	                            "x": { "scale": "x", "signal": "tooltip.x" },
	                            "dx": { "scale": "x", "band": true, "mult": 0.5 },
	                            "y": { "scale": "y", "signal": "tooltip.y", "offset": -5 },
	                            "text": { "signal": "tooltip.y" },
	                            "fillOpacity": [
	                                {
	                                    "test": "!tooltip._id",
	                                    "value": 0
	                                },
	                                { "value": 1 }
	                            ]
	                        }
	                    }
	                }
	            ]
	        };
	        return x;
	    };
	    VGTemplate.prototype.vbar = function (_values) {
	        var x = {
	            "width": 400,
	            "height": 200,
	            "padding": { "top": 10, "left": 30, "bottom": 30, "right": 10 },
	            "signals": [
	                {
	                    "name": "tooltip",
	                    "init": {},
	                    "streams": [
	                        { "type": "rect:mouseover", "expr": "datum" },
	                        { "type": "rect:mouseout", "expr": "{}" }
	                    ]
	                }
	            ],
	            "data": [
	                {
	                    "name": "table",
	                    "values": _values,
	                    "transform": [
	                        {
	                            "type": "bin",
	                            "field": "month_required",
	                            "output": { "start": "bin_start", "end": "bin_end" },
	                            "maxbins": 12
	                        }
	                    ]
	                }
	            ],
	            "scales": [
	                {
	                    "name": "x",
	                    "type": "linear",
	                    "range": "width",
	                    "domain": { "data": "table", "field": ["bin_start", "bin_end"] }
	                },
	                {
	                    "name": "y",
	                    "type": "linear",
	                    "range": "height",
	                    "domain": { "data": "table", "field": "y" },
	                    "nice": true
	                }
	            ],
	            "axes": [{ "type": "x", "scale": "x" }],
	            "marks": [
	                {
	                    "type": "rect",
	                    "from": { "data": "table" },
	                    "properties": {
	                        "enter": {
	                            "x": { "scale": "x", "field": "bin_start" },
	                            "width": { "scale": "x", "band": true, "offset": -1 },
	                            "y": { "scale": "y", "field": "y" },
	                            "y2": { "scale": "y", "value": 0 }
	                        },
	                        "update": {
	                            "fill": [
	                                {
	                                    "test": "datum._id == tooltip._id",
	                                    "value": "red"
	                                },
	                                { "value": "steelblue" }
	                            ]
	                        }
	                    }
	                },
	                {
	                    "type": "text",
	                    "properties": {
	                        "enter": {
	                            "align": { "value": "center" },
	                            "fill": { "value": "#333" }
	                        },
	                        "update": {
	                            "x": { "scale": "x", "signal": "tooltip.x" },
	                            "dx": { "scale": "x", "band": true, "mult": 0.5 },
	                            "y": { "scale": "y", "signal": "tooltip.y", "offset": -5 },
	                            "text": { "signal": "tooltip.y" },
	                            "fillOpacity": [
	                                {
	                                    "test": "!tooltip._id",
	                                    "value": 0
	                                },
	                                { "value": 1 }
	                            ]
	                        }
	                    }
	                }
	            ]
	        };
	        return x;
	    };
	    return VGTemplate;
	}());
	exports.VGTemplate = VGTemplate;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map