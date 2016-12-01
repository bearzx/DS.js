"use strict";
var Table = (function () {
    function Table() {
        var _this = this;
        this._t = {};
        // read_table_csv = (url) => {
        //     d3.csv(url, function(data) {
        //         this._t = data;
        //     });
        // }
        this.csv_callback = function (data) {
            _this._t = data;
            console.log(_this._t);
            console.log("Yo");
        };
    }
    // constructor(labels, formatter) {
    // }    
    Table.prototype.read_table = function () {
    };
    Table.prototype.read_table_csv = function (url) {
        d3.csv(url, this.csv_callback);
    };
    Table.prototype.num_rows = function () {
    };
    Table.prototype.view_rows = function () {
    };
    Table.prototype.view_row = function () {
    };
    Table.prototype.labels = function () {
    };
    Table.prototype.num_columns = function () {
    };
    Table.prototype.columns = function () {
    };
    Table.prototype.column = function () {
    };
    Table.prototype.add_row = function () {
    };
    Table.prototype.add_column = function () {
    };
    Table.prototype.relabel = function () {
    };
    Table.prototype.select_row = function () {
    };
    Table.prototype.select_column = function () {
    };
    Table.prototype.delete_row = function () {
    };
    Table.prototype.delete_column = function () {
    };
    Table.prototype.where = function () {
    };
    Table.prototype.sort = function () {
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
    };
    Table.prototype.plot = function () {
    };
    Table.prototype.bar = function () {
    };
    Table.prototype.scatter = function () {
    };
    Table.prototype.hist = function () {
    };
    Table.prototype.boxplot = function () {
    };
    return Table;
}());
exports.Table = Table;
//# sourceMappingURL=tables.js.map