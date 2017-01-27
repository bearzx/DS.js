import * as vgt from './vgtemplates';

declare var d3: any;
declare var $: any;
declare var vg: any;
declare var ace: any;
// declare var datai: any;

export class Table {

    private _t: any = [];
    private _labels: any = [];
    private _column_order: any = {};
    private _id: string;

    constructor(t?: Table, l?: any[], url?, datai?) {
        if (t != null) {

        }

        if (l != null) {
            this._labels = l.slice();
        }

        if (url != null) {
            this.read_table_csv_sync(url);
        }

        this._id = datai;
    }

    public copy_from(t: Table) {
        return this;
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
        d3.csv(url, function (data) {
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
            success: function (data) {
                _this._t = d3.csvParse(data);
                _this.table_init();
            }
        });
    }

    public set(column_or_label, f) {
        let l = this._as_label(column_or_label);
        this._t.forEach(function(row) {
            row[l] = f(row[l]);
        });

        return this;
    }

    public num_rows() {
        return this._t.length;
    }

    public labels() {
        // console.log(d3.keys(this._t[0]));
        // return d3.keys(this._t[0]);
        return this._labels;
    }

    public num_columns() {
        // console.log(this._t[0]);
        return Object.keys(this._t[0]).length;
    }

    public column(index_or_label) {
        var col = [];
        if (typeof index_or_label === 'number') {
            var column_label = this._labels[index_or_label];
            this._t.forEach(function (row) {
                col.push(row[column_label]);
            });
            return col;
        } else if (typeof index_or_label === 'string') {
            this._t.forEach(function (row) {
                col.push(row[index_or_label]);
            });
            return col;
        }
    }

    columns() {
        var _this = this;
        var cols = [];
        this._labels.forEach(function (label) {
            cols.push(_this.column(label));
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
            this._labels.forEach(function (label, index) {
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
        rows.forEach(function (row) {
            _this.with_row(row);
        });

        return this;
    }

    with_column(label, values) {
        if ((values.length == 1) && (this._t.length != 0)) {
            for (var i = 0; i < this._t.length; i++) {
                this._t[i][label] = values[0];
            }
        } else if (this._t.length != 0 && values.length == this._t.length) {
            for (var i = 0; i < this._t.length; i++) {
                this._t[i][label] = values[i];
            }
        } else if (this._t.length == 0) {
            for (var i = 0; i < values.length; i++) {
                this._t.push({ [label]: values[i] });
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

    from_columns(columns: any[]) {
        let _this = this;
        columns.forEach(function(column) {
            column.forEach(function(s, i) {
                let node = document.createElement('div');
                node.innerHTML = s;
                column[i] = node.textContent || node.innerText || '';
            });
            _this.with_column(column[0], column.slice(1, column.length));
        });

        return this;
    }

    relabel(label, new_label) {
        label = this._as_label(label);
        var index = this._labels.indexOf(label);
        if (index != -1) {
            this._labels[index] = new_label;
            this._t.forEach(function (row) {
                var val = row[label];
                delete row[label];
                row[new_label] = val;
            });
        }

        return this;
    }

    relabeled(label, new_label) {
        var copy = $.extend(true, {}, this);
        copy.relabel(label, new_label);
        return copy;
    }

    select(...column_label_or_labels: any[]) {
        // console.log(column_label_or_labels);
        var _this = this;
        column_label_or_labels = this._as_labels(column_label_or_labels);
        var table = new Table();
        for (var i = 0; i < this._t.length; i++) {
            table.with_row({});
        }
        column_label_or_labels.forEach(function (label) {
            table.with_column(label, _this.column(label));
        });

        return table;
    }

    private _as_labels(label_list) {
        var new_labels = [];
        var _this = this;
        label_list.forEach(function (l) {
            new_labels.push(_this._as_label(l));
        });

        return new_labels;
    }

    private _as_label(label) {
        if (typeof label === 'number') {
            return this._labels[label];
        } else if (typeof label === 'string') {
            return label;
        }
    }

    drop(...column_label_or_labels: any[]) {
        var left_columns = this._labels.filter(function (c) {
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
            predicate = function (a) { return a == value_or_predicate; };
        }
        this._t.forEach(function (row) {
            if (predicate(row[column_or_label])) {
                table.with_row(row);
            }
        });

        return table;
    }

    sort(column_or_label, descending = false, distinct = false) {
        var compare = function (a, b) {
            if (a[column_or_label] > b[column_or_label]) {
                return 1;
            } else if (a[column_or_label] < b[column_or_label]) {
                return -1;
            } else {
                return 0;
            }
        };

        if (descending) {
            this._t.sort(function (a, b) {
                return -compare(a, b);
            });
        } else {
            this._t.sort(function (a, b) {
                return compare(a, b);
            });
        }

        return this;
    }

    group(column_or_label: any, collect?) {
        var label = this._as_label(column_or_label);
        var counts = {};
        this._t.forEach(function (row) {
            if (row[label] in counts) {
                counts[row[label]] += 1;
            } else {
                counts[row[label]] = 1;
            }
        });

        var keys = Object.keys(counts);
        keys.sort();
        var grouped = new Table(null, [label, 'count']);
        keys.forEach(function (key) {
            grouped.with_row({ [label]: key, 'count': counts[key] });
        });

        return grouped;
    }

    groups(columns_or_labels: any[], collect?) {
        var labels = this._as_labels(columns_or_labels);
        var counts = {};
        var combinations = {};
        this._t.forEach(function (row) {
            var key = [];
            labels.forEach(function (label) {
                key.push(row[label]);
            });
            console.log(String(key));
            if (String(key) in counts) {
                counts[String(key)] += 1;
            } else {
                counts[String(key)] = 1;
            }

            if (!(String(key) in combinations)) {
                combinations[String(key)] = key;
            }
        });

        var grouped = new Table(null, labels.concat(['count']));
        Object.keys(combinations).forEach(function (key) {
            var row = {};
            labels.forEach(function (label, i) {
                row[label] = combinations[key][i];
            });
            row['count'] = counts[key];
            grouped.with_row(row);
        });

        return grouped;
    }

    pivot(columns, rows, values, collect?, zero?) {
        let column_labels = new Set();
        let row_labels = new Set();
        this._t.forEach(function (row) {
            column_labels.add(row[columns]);
            row_labels.add(row[rows]);
        });

        let pivot_t = {};
        this._t.forEach(function (row) {
            if (row[rows] in pivot_t) {
                if (row[columns] in pivot_t[row[rows]]) {
                    pivot_t[row[rows]][row[columns]].push(row[values]);
                } else {
                    pivot_t[row[rows]][row[columns]] = [row[values]];
                }
            } else {
                pivot_t[row[rows]] = {};
                pivot_t[row[rows]][row[columns]] = [row[values]];
            }
        });

        var pivoted = new Table(null, [rows].concat(Array.from(column_labels)));
        // console.log(pivot_t);

        row_labels.forEach(function (row_label: any) {
            var pivot_row = { [rows]: row_label };
            column_labels.forEach(function (column_label: any) {
                // console.log(`${row_label} | ${column_label}`);
                pivot_row[column_label] = pivot_t[row_label][column_label] ? pivot_t[row_label][column_label].length : 0;
            });
            pivoted.with_row(pivot_row);
        });

        // console.log(pivoted._t);
        return pivoted;
    }

    private index_by(label) {
        let column = this.column(label);
        var indexed = {};
        let _this = this;
        column.forEach(function (c, i) {
            if (c in indexed) {
                indexed[c].push(_this.row(i));
            } else {
                indexed[c] = [_this.row(i)];
            }
        });

        return indexed;
    }

    private _unused_label(label) {
        let original = label;
        let existing = this.labels();
        let i = 2;
        while (existing.indexOf(label) != -1) {
            label = `${original}_${i}`;
            i += 1;
        }
        return label;
    }

    join(column_label, other: Table, other_label?) {
        let _this = this;

        if (!other_label) {
            other_label = column_label;
        }

        column_label = this._as_label(column_label);
        let this_rows = this.index_by(column_label);
        let other_rows = other.index_by(other_label);
        let joined_rows = [];
        Object.keys(this_rows).forEach(function (l) {
            if (l in other_rows) {
                let other_row = other_rows[l][0];
                this_rows[l].forEach(function (row) {
                    let new_row = Object.assign({}, row);
                    Object.keys(other_row).forEach(function (l) {
                        if (column_label != other_label) {
                            new_row[_this._unused_label(l)] = other_row[l];
                        } else {
                            new_row[l] = other_row[l];
                        }
                    });
                    joined_rows.push(new_row);
                });
            }
        });

        let joined_labels = this._labels;
        other.labels().forEach(function (l) {
            if (l != other_label) {
                joined_labels.push(_this._unused_label(l));
            }
        });

        let joined = new Table(null, joined_labels);
        joined.with_rows(joined_rows);

        return joined;
    }

    stats() {
        let _this = this;
        let stats_table = new Table(null, ['statistics'].concat(this._labels));
        let min_row = { 'statistics': 'min' };
        let max_row = { 'statistics': 'max' };
        let median_row = { 'statistics': 'median' };
        let sum_row = { 'statistics': 'sum' };
        this._labels.forEach(function (l) {
            min_row[l] = d3.min(_this.column(l));
            max_row[l] = d3.max(_this.column(l));
            median_row[l] = d3.median(_this.column(l));
            sum_row[l] = d3.sum(_this.column(l));
        });
        stats_table.with_row(min_row);
        stats_table.with_row(max_row);
        stats_table.with_row(median_row);
        stats_table.with_row(sum_row);

        return stats_table;
    }

    percentile(p) {
        let pt = new Table(null, this._labels);
        let _this = this;
        let prow = {};
        this._labels.forEach(function (l) {
            let c = _this.column(l);
            c.sort();
            prow[l] = c[Math.ceil(c.length * p) - 1];
        });
        pt.with_row(prow);

        return pt;
    }

    sample(k) {
        let sampled = new Table(null, this._labels);
        let n = this._t.length;
        for (let i = 0; i < k; i++) {
            sampled.with_row(this.row(Math.ceil(Math.random() * (n - 1))));
        }

        return sampled;
    }

    sample_from_distribution() {

    }


    split(k) {
        let shuffled_indices = d3.shuffle(d3.range(this._t.length));
        let first = new Table(null, this._labels);
        let rest = new Table(null, this._labels);
        for (let i = 0; i < k; i++) {
            first.with_row(this.row(shuffled_indices[i]));
        }
        for (let i = k; i < this._t.length; i++) {
            rest.with_row(this.row(shuffled_indices[i]));
        }

        return { 'first': first, 'rest': rest };
    }

    show() {
        var _this = this;
        var s = `<table class="ds-table">`;
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

        console.log(`#table-area-${this._id}`);
        $(`#table-area-${this._id}`).html(s);
    }

    plot(xlabel, ylabel) {
        let id = this._id;
        let values = [];
        this._t.forEach(function (row) {
            values.push({ 'x': row[xlabel], 'y': row[ylabel] });
        });
        let templates = new vgt.VGTemplate();
        vg.parse.spec(templates.plot(values, xlabel, ylabel), function (chart) { chart({ "el": `#vis-${id}` }).update(); });
    }

    bar(xlabel, ylabel) {
        let id = this._id;
        let templates = new vgt.VGTemplate();
        let values = [];
        this._t.forEach(function (row) {
            values.push({ 'x': row[xlabel], 'y': row[ylabel] });
        });
        vg.parse.spec(templates.bar(values, xlabel, ylabel), function (chart) { chart({ "el": `#vis-${id}` }).update(); });
    }

    scatter(xlabel, ylabel) {
        let id = this._id;
        let values = [];
        this._t.forEach(function (row) {
            values.push({ 'x': row[xlabel], 'y': row[ylabel] });
        });
        let templates = new vgt.VGTemplate();
        vg.parse.spec(templates.scatter(values, xlabel, ylabel), function (chart) { chart({ "el": `#vis-${id}` }).update(); });
    }

    scatter_d3(xlabel, ylabel) {
        let id = this._id;
        let values = [];
        this._t.forEach(function (row) {
            values.push({ 'x': row[xlabel], 'y': row[ylabel] });
        });

        var margin = { top: 20, right: 15, bottom: 60, left: 60 }
            , width = 400 - margin.left - margin.right
            , height = 400 - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .domain([0, d3.max(values, function (d) { return d.x; })])
            .range([0, width]);

        var y = d3.scale.linear()
            .domain([0, d3.max(values, function (d) { return d.y; })])
            .range([height, 0]);

        var chart = d3.select(`#vis-${id}`)
            .append('svg:svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .attr('class', 'chart')

        var main = chart.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'main')

        // draw the x axis
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

        main.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .attr('class', 'main axis date')
            .call(xAxis);

        // draw the y axis
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

        main.append('g')
            .attr('transform', 'translate(0,0)')
            .attr('class', 'main axis date')
            .call(yAxis);

        var g = main.append("svg:g");

        g.selectAll("scatter-dots")
            .data(values)
            .enter().append("svg:circle")
            .attr("cx", function (d, i) { return x(d.x); })
            .attr("cy", function (d) { return y(d.y); })
            .attr("r", 8);
    }

    hist(column: string) {
        var bins = {};
        this._t.forEach(function (row) {
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
        xs.forEach(function (x) {
            data.push({ 'x': x, 'y': bins[x] });
        });
        // console.log(data);
        var templates = new vgt.VGTemplate();
        var id = this._id;
        vg.parse.spec(templates.bar(data, '', ''), function (error, chart) {
            chart({ el: `#vis-${id}` }).update();
        });
    }

    vhist(column: string) {
        var templates = new vgt.VGTemplate();
        var id = this._id;
        vg.parse.spec(templates.vbar(this._t), function (error, chart) {
            chart({ el: `#vis-${id}` }).update();
        });
    }

    boxplot() {
        let id = this._id;
        let templates = new vgt.VGTemplate();
        let values = [];
        let _this = this;
        this._t.forEach(function(row) {
            _this._labels.forEach(function(l, i) {
                values.push({
                    'x': l,
                    'y2': 0,
                    'group': 1,
                    'y': row[l]
                });
            });
        });
        vg.parse.spec(templates.boxplot(values), function (error, chart) {
            chart({ el: `#vis-${id}` }).update();
        });
    }

    preview(method_call) {
        let method_name = method_call.slice(0, method_call.indexOf('('));        
        let args = eval('(' + method_call.slice(method_call.indexOf('(') + 1, method_call.indexOf(')')) + ')');

        console.log(args);

        if (method_name == 'with_row') {
            var _this = this;
            var s = `<table class="ds-table">`;
            s += "<tr>";
            this._labels.forEach(function (label) {
                s += "<th>";
                s += label;
                s += "</th>";
            });
            s += "</tr>";

            s += `<tr class="blank_row"><td colspan="${this._labels.length}" align="center">...</td></tr>`;

            this._t.slice(this._t.length - 2, this._t.length).forEach(function (row) {
                s += "<tr>";                
                _this._labels.forEach(function (label) {
                    s += "<td>";
                    s += row[label];
                    s += "</td>";
                });
                s += "</tr>";
            });            

            s += `<tr class='preview'>`;
            this._labels.forEach(function(label) {
                s += "<td>";
                s += args[label];
                s += "</td>";
            });
            s += "</tr>";
                        
            $(`#table-area-${this._id}`).html(s);
        } else if (method_name == 'with_column') {

        }
    }

}