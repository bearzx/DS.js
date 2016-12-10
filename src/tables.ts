import * as vgt from './vgtemplates';

declare var d3: any;
declare var $: any;
declare var vg: any;
declare var math: any;

export class Table {

    private _t: any = [];
    private _labels: any = [];
    private _column_order: any = {};

    constructor(t?: Table, l?: any[]) {
        if (t != null) {

        }

        if (l != null) {
            this._labels = l.slice();
        }
    }

    read_table() {

    }
    
    private table_init() {
        this._labels = d3.keys(this._t[0]);
        this._labels.forEach((item, index) => {
            this._column_order[item] = index;
        });
        // console.log(this._column_order);
    }

    public read_table_csv_async(url: string, callback: any) {
        var _this = this;
        d3.csv(url, function(data) {
            _this._t = data;
            _this.table_init();
            callback();
        });
    }

    public read_table_csv_sync(url: string) {
        var _this = this;
        $.ajax({
            dataType: "text",
            url: url,
            async: false,
            success: function(data) {
                _this._t = d3.csvParse(data);
                _this.table_init();                
            }
        });        
    }

    public num_rows() {        
        return this._t.length;
    }    

    labels() {
        // console.log(d3.keys(this._t[0]));
        // return d3.keys(this._t[0]);
        return this._labels;
    }

    public num_columns() {
        // console.log(this._t[0]);
        return Object.keys(this._t[0]).length;
    }

    column_by_id(index: number) {
        var col = [];
        var column_name = this._labels[index];
        this._t.forEach(function(row) {
            col.push(row[column_name]);
        });
        return col;
    }

    column_by_name(name: string) {
        var col = [];
        this._t.forEach(function(row) {
            col.push(row[name]);
        });
        return col;
    }

    columns() {
        var _this = this;
        var cols = [];
        this._labels.forEach(function(label) {
            cols.push(_this.column_by_name(label));
        });
        return cols;
    }

    row(index: number) {
        return this._t[index];
    }

    // return a view of all rows
    rows() {
        return this._t;
    }

    with_row(row) {
        if (row instanceof Array) {
            var o_row = {};
            this._labels.forEach(function(label, index) {
                o_row[label] = row[index];
            });
            this._t.push(o_row);
        } else if (row instanceof Object) {
            this._t.push(row);
        }

        return this;        
    }

    with_rows(rows) {
        var _this = this;
        rows.forEach(function(row) {            
            _this.with_row(row);
        });
        
        return this;
    }

    with_column(label, values) {
        if (values.length == 1) {
            for (var i = 0; i < this._t.length; i++) {
                this._t[i][label] = values[0];
            }
        } else if (values.length == this._t.length) {
            for (var i = 0; i < this._t.length; i++) {
                this._t[i][label] = values[i];
            }
        }

        if (!this._labels.includes(label)) {
            this._labels.push(label);
        }

        return this;
    }

    with_columns(...labels_and_values: any[]) {
        if (labels_and_values.length % 2 == 0) {
            for (var i = 0; i < labels_and_values.length / 2; i++) {
                this.with_column(labels_and_values[i * 2], labels_and_values[i * 2 + 1]);
            }
        }
        
        return this;
    }

    relabel(column_label, new_label) {
        var index = this._labels.indexOf(column_label);
        if (index != -1) {
            this._labels[index] = new_label;
            this._t.forEach(function(row) {
                var val = row[column_label];
                delete row[column_label];
                row[new_label] = val;
            });
        }
        
        return this;
    }

    select(...column_label_or_labels: any[]) {
        console.log(column_label_or_labels);
        var _this = this;
        var table = new Table();
        for (var i = 0; i < this._t.length; i++) {
            table.with_row({});
        }
        column_label_or_labels.forEach(function(label) {
            table.with_column(label, _this.column_by_name(label));
        });

        return table;
    }

    drop(...column_label_or_labels: any[]) {
        var left_columns = this._labels.filter(function(c) {
            return column_label_or_labels.indexOf(c) == -1;
        });

        return this.select.apply(this, left_columns);
    }

    where(column_or_label, value_or_predicate) {
        var table = new Table(null, this.labels());
        var predicate;
        if (value_or_predicate instanceof Function) {
            predicate = value_or_predicate;
        } else {            
            predicate = function(a) { return a == value_or_predicate; }; 
        }
        this._t.forEach(function(row) {
            if (predicate(row[column_or_label])) {
                table.with_row(row);
            }
        });

        return table;
    }

    sort(column_or_label, descending = false, distinct = false) {
        var compare = function(a, b) {            
            if (a[column_or_label] > b[column_or_label]) {
                return 1;
            } else if (a[column_or_label] < b[column_or_label]) {
                return -1;
            } else {
                return 0;
            }
        };

        if (descending) {
            this._t.sort(function(a, b) {
                return -compare(a, b);
            });
        } else {
            this._t.sort(function(a, b) {
                return compare(a, b);
            });
        }        
        
        return this;
    }

    group() {

    }

    groups() {

    }

    pivot() {

    }

    join() {

    }

    stats() {

    }

    percentile() {

    }

    sample() {
        
    }

    sample_from_distribution() {

    }

    split() {

    }

    show() {
        var _this = this;
        var s = "<table>";
        s += "<tr>";
        this._labels.forEach(function(label) {
            s += "<th>";
            s += label;
            s += "</th>";
        });
        s += "</tr>";
        this._t.forEach(function(row) {
            s += "<tr>";
            // console.log(row);
            _this._labels.forEach(function(label) {
                s += "<td>";
                s += row[label];
                s += "</td>";
            });
            s += "</tr>";
        });
        // console.log(s);
        // console.log($("#table-area").html(s));        
        $("#table-area").html(s);
    }

    plot() {

    }

    bar() {

    }

    scatter() {

    }

    hist(column: string) {
        var bins = {};
        this._t.forEach(function(row) {
            var elem = row[column];
            if (elem.length != 0) {                        
                if (elem in bins) {
                    bins[elem] += 1;
                } else {
                    bins[elem] = 1;
                }
            }
        });
        var data = [];
        var xs = Object.keys(bins);
        xs.sort((a, b) => parseInt(a) - parseInt(b));
        // console.log(xs);
        xs.forEach(function(x) {
            data.push({'x': x, 'y': bins[x]});
        });
        console.log(data);
        var templates = new vgt.VGTemplate();
        vg.parse.spec(templates.bar(data), function(error, chart) {
            chart({el: "#vis"}).update();
        });          
    }

    vhist(column: string) {
        var templates = new vgt.VGTemplate();
        vg.parse.spec(templates.vbar(this._t), function(error, chart) {
            chart({el: "#vis"}).update();
        });
    }

    boxplot() {

    }

}