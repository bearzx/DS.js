import * as vgt from './vgtemplates';
import * as vglt from './vgltemplates';

declare var d3: any;
declare var $: any;
declare var vg: any;
declare var vega: any;
declare var ace: any;
declare var window: any;
declare var esprima: any;
declare var numeral: any;
declare var nj: any;

export class Table {

    private _t: any = [];
    private _labels: any = [];
    private _column_order: any = {};
    // public _id: string;
    // public _datai_envi: string;
    public __showable__ = true;

    // constructor of the class
    // t? - make this table a copy of t
    // l? - pre-alllocated labels
    // url? - a data url to load from
    // datai? - environment id to refer to certain editor/show-panels
    constructor(t?: Table, l?: any[], url?, datai?) {
        // types of column variables, especially in the cases when we want to do sorting
        if (t != null) {

        }

        if (l != null) {
            this._labels = l.slice();
        }

        if (url != null) {
            if (url.endsWith('.csv')) {
                this.read_table_csv_sync(url);
            } else if (url.endsWith('.tsv')) {
                this.read_table_tsv_sync(url);
            }
        }

        // if (datai == undefined) {
        //     if (window._datai) {
        //         this._datai_envi = window._datai;
        //     }
        // } else {
        //     this._datai_envi = datai;
        // }

        this.auto_convert();
    }

    // convert all the elements with a cast function (e.g. parseInt)
    // cast - converion function
    // side-effects: yes
    public convert(cast: Function) {
        let _this = this;
        this._t.forEach(function(row) {
            _this._labels.forEach(function(l) {
                row[l] = cast(row[l]);
            });
        });

        return this;
    }

    // pure function version of "convert"
    public converted(cast: Function) {
        let copy = this.copy();
        copy.convert(cast);
        return copy;
    }

    // try to convert each element of the table to a number by employing
    // the numeral.js library
    public auto_convert() {
        let _this = this;
        this._t.forEach(function(row) {
            _this._labels.forEach(function(l) {
                let n = numeral(row[l]);
                row[l] =  n._value != null ? n._value : row[l];
            });
        });
    }

    // unimplemented
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

    // read a csv asynchronous-ly, users need to wrap their code
    // into a callback function
    public read_table_csv_async(url: string, callback: any) {
        var _this = this;
        d3.csv(url, function (data) {
            _this._t = data;
            _this.table_init();
            callback();
        });
    }

    // read a csv synchronous-ly
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

    public read_table_tsv_sync(url: string) {
        var _this = this;
        $.ajax({
            dataType: "text",
            url: url,
            async: false,
            success: function (data) {
                _this._t = d3.tsvParse(data);
                _this.table_init();
            }
        });
    }

    // change values in a column
    // using a user-defined mapping function
    public set(column_or_label, f) {
        let l = this._as_label(column_or_label);
        this._t.forEach(function(row) {
            row[l] = f(row[l]);
        });

        return this;
    }

    // return an element at [row, col]
    public get_element(row, col) {
        return this._t[row][col];
    }

    // return the number of rows
    public num_rows() {
        return this._t.length;
    }

    // return a list of all the labels
    public get_column_names() {
        let labels_copy = $.extend([], this._labels);
        return labels_copy;
    }

    // return the number of columns
    public num_columns() {
        return Object.keys(this._t[0]).length;
    }

    // return a certain column
    public get_column(index_or_label) {
        var col = [];
        if (typeof index_or_label === 'number') {
            var column_label = this._labels[index_or_label];
            this._t.forEach(function (row) {
                col.push(row[column_label]);
            });
            return nj.array(col);
        } else if (typeof index_or_label === 'string') {
            this._t.forEach(function (row) {
                col.push(row[index_or_label]);
            });
            return nj.array(col);
        }
    }

    // return all the columns in a list
    public get_columns() {
        var _this = this;
        var cols = [];
        this._labels.forEach(function (label) {
            cols.push(_this.get_column(label));
        });
        return cols;
    }

    private cur_env() {
        return `${window.datai}-${window.envi}`;
    }

    // return a certain row
    get_row(index: number) {
        return this._t[index];
    }

    // return a view of all rows
    get_rows() {
        return this._t;
    }

    // add one row to the end of the table
    add_row(row) {
        let copy = this.copy();
        copy._add_row(row);

        return copy;
    }

    // add one row to the end of the table
    _add_row(row) {
        // [TODO] what if row doesn't have enough elements? e.g. lack of values for some columns
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

    // [impure] add multiple rows to the end of the table
    _add_rows(rows) {
        var _this = this;
        rows.forEach(function (row) {
            _this._add_row(row);
        });

        return this;
    }

    // [pure] add multiple rows to the end of the table
    add_rows(rows) {
        let copy = this.copy();
        copy._add_rows(rows);

        return copy;
    }

    // [pure] add a column to the end of the table
    add_column(label, values) {
        // [TODO] what if label is already in _labels?
        let copy = this.copy();
        copy._add_column(label, values);

        return copy;
    }

    // [impure] add a column to the end of the table
    _add_column(label, values) {
        if (values.tolist) {
            values = values.tolist();
        }
        // console.log(values);
        if ((values.length == 1) && (this._t.length != 0)) {
            // insert a new column with all the same values
            for (var i = 0; i < this._t.length; i++) {
                this._t[i][label] = values[0];
            }
        } else if (this._t.length != 0 && values.length == this._t.length) {
            // values is a complete column, and the current table is not empty
            for (var i = 0; i < this._t.length; i++) {
                this._t[i][label] = values[i];
            }
        } else if (this._t.length == 0) {
            // current table is empty
            for (var i = 0; i < values.length; i++) {
                this._t.push({ [label]: values[i] });
            }
        }

        if (!this._labels.includes(label)) {
            this._labels.push(label);
        }

        return this;
    }

    // [pure] add multiple columns to the end of the table
    add_columns(...labels_and_values: any[]) {
        let copy = this.copy();
        copy._add_columns(labels_and_values);
        // console.log(copy);
        return copy;
    }

    // [impure] add multiple columns to the end of the table
    _add_columns(...labels_and_values: any[]) {
        if (labels_and_values[0] instanceof Array) {
            labels_and_values = labels_and_values[0];
        }

        if (labels_and_values.length % 2 == 0) {
            for (let i = 0; i < labels_and_values.length / 2; i++) {
                if (labels_and_values[i * 2 + 1].tolist) {
                    this._add_column(labels_and_values[i * 2], labels_and_values[i * 2 + 1].tolist());
                } else {
                    this._add_column(labels_and_values[i * 2], labels_and_values[i * 2 + 1]);
                }
            }
        }

        return this;
    }

    from_columns(columns: any[]) {
        // console.log(columns);
        let _this = this;
        columns.forEach(function(column) {
            column.forEach(function(s, i) {
                let node = document.createElement('div');
                node.innerHTML = s;
                column[i] = node.textContent || node.innerText || '';
                if (i != 0) {
                    let n = numeral(column[i]);
                    column[i] = n._value ? n._value : column[i];
                }
            });
            _this._add_column(column[0], column.slice(1, column.length));
        });

        return this;
    }

    // [impure] relabel a column name
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

    // [pure] relabel a column name
    rename_column(label, new_label) {
        var copy = $.extend(true, {}, this);
        copy.relabel(label, new_label);
        return copy;
    }

    // copy a table
    copy() {
        return $.extend(true, {}, this);
    }

    // copy a table
    copy_table() {
        return this.copy();
    }

    // [pure] select a column
    select_columns(...column_label_or_labels: any[]) {
        // /console.log(column_label_or_labels);
        var _this = this;
        column_label_or_labels = this._as_labels(column_label_or_labels);
        var table = new Table();
        for (var i = 0; i < this._t.length; i++) {
            table.add_row({});
        }
        column_label_or_labels.forEach(function (label) {
            table._add_column(label, _this.get_column(label));
        });
        // console.log(table);

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

    private _as_label_indices(...label_list) {
        if (label_list[0] instanceof Array) {
            label_list = label_list[0];
        }
        let indices = [];
        let _this = this;
        label_list.forEach(function(l) {
            indices.push(_this._as_label_index(l));
        });
        indices.sort((a, b) => (a - b));

        return indices;
    }

    private _as_label_index(label) {
        if (typeof label === 'number') {
            return label;
        } else if (typeof label === 'string') {
            return this._labels.indexOf(label);
        }
    }

    private _as_label(label) {
        if (typeof label === 'number') {
            return this._labels[label];
        } else if (typeof label === 'string') {
            return label;
        }
    }

    // [pure] drop a column/columns
    drop_columns(...column_label_or_labels: any[]) {
        var left_columns = this._labels.filter(function (c) {
            return column_label_or_labels.indexOf(c) == -1;
        });

        return this.select_columns.apply(this, left_columns);
    }

    // [pure] filter rows based on the judging function
    where(column_or_label, value_or_predicate) {
        return this._where(column_or_label, value_or_predicate, false);
    }

    iwhere(column_or_label, value_or_predicate) {
        return this._where(column_or_label, value_or_predicate, true);
    }

    _where(column_or_label, value_or_predicate, keep_index: boolean) {
        let table = new Table(null, this.get_column_names(), null);
        let indices = [];
        let predicate;
        if (value_or_predicate instanceof Function) {
            predicate = value_or_predicate;
        } else {
            predicate = function (a) { return a == value_or_predicate; };
        }
        this._t.forEach(function (row, i) {
            if (predicate(row[column_or_label])) {
                table._add_row(row);
                indices.push(i);
            }
        });

        return keep_index ? { table: table, index: indices, label: this._as_label_index(column_or_label) } : table;
    }

    // [impure] sort all rows based on a column
    sort(column_or_label, descending = false, distinct = false) {
        column_or_label = this._as_label(column_or_label);
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

    // [pure] sort all rows based on a column
    sorted(column_or_label, descending = false, distinct = false) {
        let copy = this.copy();
        copy.sort(column_or_label, descending, distinct);
        return copy;
    }

    // [pure] grouping rows based on a label
    groupby(column_or_label: any, collect?) {
        let label = this._as_label(column_or_label);
        let group_t = {};
        this._t.forEach(function (row) {
            if (row[label] in group_t) {
                group_t[row[label]].push(row);
            } else {
                group_t[row[label]] = [row];
            }
        });

        let keys = Object.keys(group_t);
        keys.sort();
        let grouped;
        if (collect) {
            let old_labels = this.get_column_names();
            old_labels.splice(old_labels.indexOf(label), 1);
            grouped = new Table(null, [label].concat(old_labels), null);
            keys.forEach(function(k) {
                let row = { [label]: k };
                old_labels.forEach(function(l) {
                    row[l] = collect(group_t[k].map(x => x[l]));
                });
                grouped._add_row(row);
            });
        } else {
            grouped = new Table(null, [label, 'count'], null);
            keys.forEach(function (key) {
                grouped._add_row({ [label]: key, 'count': group_t[key].length });
            });
        }

        // console.log(grouped);
        return grouped;
    }

    // [pure] group rows based on labels
    groupsby(columns_or_labels: any[], collect?) {
        let labels = this._as_labels(columns_or_labels);
        // console.log(labels);
        let group_t = {};
        let key_combinations = {};
        this._t.forEach(function (row) {
            var key = [];
            labels.forEach(function (label) {
                key.push(row[label]);
            });
            let skey = String(key);
            if (skey in group_t) {
                group_t[skey].push(row);
            } else {
                group_t[skey] = [row];
            }

            if (!(skey in key_combinations)) {
                key_combinations[skey] = key;
            }
        });
        let grouped;
        if (collect) {
            let old_labels = this.get_column_names();
            labels.forEach(function(l) {
                old_labels.splice(old_labels.indexOf(l), 1);
            });
            grouped = new Table(null, labels.concat(old_labels), null);
            Object.keys(key_combinations).forEach(function(skey) {
                let row = {};
                labels.forEach(function (l, i) {
                    row[l] = key_combinations[skey][i];
                });
                old_labels.forEach(function(l) {
                    row[l] = collect(group_t[skey].map(x => x[l]));
                });
                grouped._add_row(row);
            });
        } else {
            grouped = new Table(null, labels.concat(['count']));
            Object.keys(key_combinations).forEach(function (skey) {
                let row = {};
                labels.forEach(function (l, i) {
                    row[l] = key_combinations[skey][i];
                });
                row['count'] = group_t[skey].length;
                grouped._add_row(row);
            });
        }

        // console.log(grouped);
        return grouped;
    }

    // [pure] generate a pivot table
    pivot(columns, rows, values, collect?, zero?) {
        // [TODO] implement more optional arguments
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

        var pivoted = new Table(null, [rows].concat(Array.from(column_labels)), null);

        row_labels.forEach(function (row_label: any) {
            var pivot_row = { [rows]: row_label };
            column_labels.forEach(function (column_label: any) {
                // console.log(`${row_label} | ${column_label}`);
                let l = pivot_t[row_label][column_label] ? pivot_t[row_label][column_label] : [];
                pivot_row[column_label] = collect ? collect(l) : l.length;
                if (!pivot_row[column_label]) {
                    pivot_row[column_label] = 0;
                }
            });
            pivoted._add_row(pivot_row);
        });

        // console.log(pivoted);
        return pivoted;
    }

    private index_by(label) {
        let column = this.get_column(label).tolist();
        var indexed = {};
        let _this = this;
        column.forEach(function (c, i) {
            if (c in indexed) {
                indexed[c].push(_this.get_row(i));
            } else {
                indexed[c] = [_this.get_row(i)];
            }
        });

        return indexed;
    }

    private _unused_label(label) {
        let original = label;
        let existing = this.get_column_names();
        let i = 2;
        while (existing.indexOf(label) != -1) {
            label = `${original}_${i}`;
            i += 1;
        }

        return label;
    }

    // [pure] join this table with another table
    join(column_label, other: Table, other_label?) {
        // console.log('this'); console.log(this);
        // console.log('other'); console.log(other);

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

        let joined_labels = this.get_column_names();
        other.get_column_names().forEach(function (l) {
            if (l != other_label) {
                joined_labels.push(_this._unused_label(l));
            }
        });

        let joined = new Table(null, joined_labels, null);
        joined._add_rows(joined_rows);

        // console.log('joined table');
        // console.log(joined);

        return joined;
    }

    // [pure] generate a table a few statistics information: min, max, median, sum
    summary_statistics() {
        let _this = this;
        let stats_table = new Table(null, ['statistics'].concat(this._labels));
        let min_row = { 'statistics': 'min' };
        let max_row = { 'statistics': 'max' };
        let median_row = { 'statistics': 'median' };
        let sum_row = { 'statistics': 'sum' };
        this._labels.forEach(function (l) {
            let cur_col = _this.get_column(l);
            min_row[l] = cur_col.min();
            max_row[l] = cur_col.max();
            median_row[l] = d3.median(cur_col.tolist());
            sum_row[l] = cur_col.sum();
        });
        stats_table._add_row(min_row);
        stats_table._add_row(max_row);
        stats_table._add_row(median_row);
        stats_table._add_row(sum_row);

        return stats_table;
    }

    // [pure] generate the rows (sorted) under a certain percentile
    percentile(p) {
        let pt = new Table(null, this._labels);
        let _this = this;
        let prow = {};
        this._labels.forEach(function (l) {
            let c = _this.get_column(l);
            c.sort();
            prow[l] = c[Math.ceil(c.length * p) - 1];
        });
        pt.add_row(prow);

        return pt;
    }

    // [pure] sample k rows from this table
    sample_n_random_rows(k) {
        let sampled = new Table(null, this._labels);
        let n = this._t.length;
        for (let i = 0; i < k; i++) {
            sampled._add_row(this.get_row(Math.ceil(Math.random() * (n - 1))));
        }

        return sampled;
    }

    // split the current table into two: first k rows and the last n - k rows
    split(k) {
        let shuffled_indices = d3.shuffle(d3.range(this._t.length));
        let first = new Table(null, this._labels);
        let rest = new Table(null, this._labels);
        for (let i = 0; i < k; i++) {
            first._add_row(this.get_row(shuffled_indices[i]));
        }
        for (let i = k; i < this._t.length; i++) {
            rest._add_row(this.get_row(shuffled_indices[i]));
        }

        return { 'first': first, 'rest': rest };
    }

    // show the table in the show-panel
    show(hide = false, table_expr?) {
        let raw_components = this.construct_table_components();
        for (let i = 0; i < raw_components[0].length; i++) {
            raw_components[0][i] = $(raw_components[0][i]).attr('class', 'table-header-col').prop('outerHTML');
        }

        window.selected_columns = [];
        if (!table_expr) {
            table_expr = `t${window.datai}`;
        }

        $(`#table-area-${this.cur_env()}`).html('');
        $(`#table-area-${this.cur_env()}`).html(this.construct_html_table(raw_components, hide, hide));
        $('.suggestion-panel').hide();

        let _this = this;
        // events binding for table header
        // this event binding is a legacy code when we want to open the suggestion pane via hovering on a single column header
        // $('.table-header-col').hover(function() {
        //     if (window.selected_columns.length == 0) {
        //         let col_label = $(this).text();
        //         let pos = $(this).position();
        //         let suggestions = [
        //             `set('${col_label}', x => x)`,
        //             `column('${col_label}')`,
        //             `select('${col_label}')`,
        //             `drop('${col_label}')`,
        //             `relabel('${col_label}', 'new_label')`,
        //             `relabeled('${col_label}', 'new_label')`,
        //             `where('${col_label}', x => true)`,
        //             `sort('${col_label}')`,
        //             `sorted('${col_label}')`,
        //             `group('${col_label}')`,
        //             `join('${col_label}', other_table, other_label?)`, // [TODO] how to do this?
        //             `hist('${col_label}')`
        //         ];
        //         _this.construct_html_suggestions(suggestions, pos, table_expr);
        //     }
        // });

        // multi-column selection
        // set a "global" variable after each selection
        // and pop out suggestions based on the # of selections
        $('.table-header-col').click(function() {
            if ($(this).hasClass('table-header-selected')) {
                $(this).removeClass('table-header-selected');
                let index = window.selected_columns.indexOf($(this).attr('data'));
                window.selected_columns.splice(index, 1);
                $(`#suggestion-${_this.cur_env()}`).hide();
            } else {
                $(this).addClass('table-header-selected');
                window.selected_columns.push($(this).attr('data'));
            }

            let suggestions;
            let pos = $(this).position();
            if (window.selected_columns.length == 1) {
                let col_label = $(this).text();
                let pos = $(this).position();
                let suggestions = [
                    `set('${col_label}', x => x)`,
                    `get_column('${col_label}')`,
                    `select_columns('${col_label}')`,
                    `drop_columns('${col_label}')`,
                    `rename_column('${col_label}', 'new_label')`,
                    `where('${col_label}', x => true)`,
                    `sort('${col_label}')`, // sorted?
                    `groupby('${col_label}')`,
                    `join('${col_label}', other_table, other_label?)`, // [TODO] how to do this?
                    `histogram('${col_label}')`
                ];
                _this.construct_html_suggestions(suggestions, pos, table_expr);
            } else if (window.selected_columns.length == 2) {
                let col1 = window.selected_columns[0];
                let col2 = window.selected_columns[1];
                let parameters = `('${col1}', '${col2}')`;
                suggestions = [
                    `select_columns` + parameters,
                    `drop_columns` + parameters,
                    `groupsby` + parameters,
                    `lineplot` + parameters,
                    `barplot` + parameters,
                    `scatterplot` + parameters
                ];
                _this.construct_html_suggestions(suggestions, pos, table_expr);
            } else if (window.selected_columns.length == 3) {
                let col1 = window.selected_columns[0];
                let col2 = window.selected_columns[1];
                let col3 = window.selected_columns[2];
                let parameters = `('${col1}', '${col2}', '${col3}')`;
                suggestions = [
                    `select_columns` + parameters,
                    `drop_columns` + parameters,
                    `groupsby` + parameters,
                    `pivot('${col1}', '${col2}', '${col3}', d3.sum)`
                ];
                _this.construct_html_suggestions(suggestions, pos, table_expr);
            } else if (window.selected_columns.length > 3) {
                let parameters = '(' + window.selected_columns.map(x => `'${x}'`).join(', ') + ')';
                suggestions = [
                    `select_columns` + parameters,
                    `drop_columns` + parameters,
                    `groupsby` + parameters
                ];
                _this.construct_html_suggestions(suggestions, pos, table_expr);
            }
        });

        // events binding for last column
        // $('.last-col').click(function() {
        //     let pos = $(this).position();
        //     let suggestions = ['with_column(label, values)', 'with_columns(label1, values1, label2, values2, ...)'];
        //     _this.construct_html_suggestions(suggestions, pos);
        // });

        // events binding for last row
        // $('.last-row').click(function() {
        //     let pos = $(this).position();
        //     let suggestions = ['with_row(row)', 'with_rows(rows)'];
        //     _this.construct_html_suggestions(suggestions, pos);
        // });

        $('.ds-table-elem').click(function() {
            if ($(this).hasClass('table-elem-selected')) {
                $(this).removeClass('table-elem-selected');
                $(`#suggestion-${_this.cur_env()}`).hide();
            } else {
                $(this).addClass('table-elem-selected');
                let pos = $(this).position();
                let row = $(this).attr('row');
                let col = $(this).attr('col');
                let suggestions = [
                    `get_element(${row}, '${col}')`,
                    `get_row(${row})`,
                    `split(${row})`
                ];
                _this.construct_html_suggestions(suggestions, pos, table_expr);
            }
        });
    }

    construct_html_suggestions(suggestions, pos, table_expr) {
        let datai = this.cur_env();
        let template = `
            <div class="suggestions-wrap">
                <div class="left">
                <h5>In-Context Operations</h5>
                <ul>
        `;
        suggestions.forEach(function(s) {
            template += `<li class="suggestion-item">${s}</li>`;
        });
        template += '</ul></div>';
        let global_methods = [
            'num_rows()',
            'num_columns()',
            'get_column_names()',
            'get_columns()',
            'add_row(array_or_object)',
            // 'add_rows()',
            'add_column(column_name, column_values)',
            // 'add_columns()',
            'copy_table()',
            'summary_statistics()',
            // 'percentile()',
            'sample_n_random_rows(n)',
        ];
        template += `
            <div class="right">
            <h5>Global Operations</h5>
            <ul>
        `;
        global_methods.forEach(function(s) {
            template += `<li class="suggestion-item">${s}</li>`;
        });
        template += '</ul></div></div>'

        $(`#suggestion-${datai}`).html(template).css({
            left: pos.left + 25,
            top: pos.top + 15
        }).show('fast');

        $(`.suggestion-item`).click(function() {
            let editor = ace.edit(`editor-${datai}`);
            let new_code = table_expr + '.' + $(this).text() + ';';
            let rown = editor.getCursorPosition().row;
            editor.getSession().getDocument().insertLines(rown + 1, [new_code]);
            editor.selection.moveCursorToPosition({ row: rown + 1, column: 0 });
            editor.selection.selectLineEnd();
            editor.focus();
            $(`#suggestion-${datai}`).hide();
        });
    }

    peek() {
        this.show(true);
    }

    // plot a ylabel-xlabel figure
    vplot(xlabel, ylabel, xtype: string = 'linear') {
        xlabel = this._as_label(xlabel);
        ylabel = this._as_label(ylabel);
        let id = this.cur_env();
        let values = [];
        this._t.forEach(function (row) {
            values.push({ 'x': row[xlabel], 'y': row[ylabel] });
        });
        let templates = new vgt.VGTemplate();
        vg.parse.spec(templates.plot(values, xlabel, ylabel, xtype), function (chart) { chart({ "el": `#table-area-${id}` }).update(); });
    }

    lineplot(xlabel, ylabel, xtype: string = 'quantitative') {
        xlabel = this._as_label(xlabel);
        ylabel = this._as_label(ylabel);
        let id = this.cur_env();
        let values = [];
        this._t.forEach(function (row) {
            values.push({ 'x': row[xlabel], 'y': row[ylabel] });
        });
        let templates = new vglt.VGLTemplate();
        vg.embed(`#table-area-${id}`, templates.plot(values, xlabel, ylabel, xtype), function(error, result) {
            // console.log(error);
        });
    }

    barplot(xlabel, ylabel, xtype: string = 'nominal', ytype: string = 'quantitative') {
        xlabel = this._as_label(xlabel);
        ylabel = this._as_label(ylabel);
        let id = this.cur_env();
        let templates = new vglt.VGLTemplate();
        let values = [];
        this._t.forEach(function (row) {
            values.push({ 'x': row[xlabel], 'y': row[ylabel] });
        });
        vg.embed(`#table-area-${id}`, templates.bar(values, xlabel, ylabel, xtype, ytype), function(error, result) {
            // console.log(error);
        });
    }

    // create a ylabel-xlabel bar chart
    vbar(xlabel, ylabel) {
        let id = this.cur_env();
        let templates = new vgt.VGTemplate();
        let values = [];
        this._t.forEach(function (row) {
            values.push({ 'x': row[xlabel], 'y': row[ylabel] });
        });
        vg.parse.spec(templates.bar(values, xlabel, ylabel), function (chart) { chart({ "el": `#table-area-${id}` }).update(); });
    }

    scatterplot(xlabel, ylabel, xtype: string = 'quantitative') {
        xlabel = this._as_label(xlabel);
        ylabel = this._as_label(ylabel);
        let id = this.cur_env();
        let values = [];
        this._t.forEach(function (row) {
            values.push({ 'x': row[xlabel], 'y': row[ylabel] });
        });
        let templates = new vglt.VGLTemplate();
        vg.embed(`#table-area-${id}`, templates.scatter(values, xlabel, ylabel, xtype), function(error, result) {
            // console.log(error);
        });
    }

    // create a ylabel-xlabel bar chart
    vscatter(xlabel, ylabel, xtype: string = 'linear') {
        let id = this.cur_env();
        let values = [];
        this._t.forEach(function (row) {
            values.push({ 'x': row[xlabel], 'y': row[ylabel] });
        });
        let templates = new vgt.VGTemplate();
        vg.parse.spec(templates.scatter(values, xlabel, ylabel, xtype), function (chart) { chart({ "el": `#table-area-${id}` }).update(); });
    }

    histogram(column: string, nbins: number = 10) {
        // let s = new Set(this.get_column(column).tolist());
        let id = this.cur_env();
        let values = [];
        this._t.forEach(function (row) {
            values.push({ 'x': row[column] });
        });
        let templates = new vglt.VGLTemplate();
        vg.embed(`#table-area-${id}`, templates.hist(values, nbins), function(error, result) {
            // console.log(error);
        });
    }

    // create a histogram on a certain column
    // naive version
    vhist(column: string) {
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
        var id = this.cur_env();
        vg.parse.spec(templates.bar(data, '', ''), function (error, chart) {
            chart({ el: `#table-area-${id}` }).update();
        });
    }

    // @deprecated
    bhist(column: string, nbins: number) {
        let bins = {};
        if (nbins) {
            let col = this.get_column(column);
            let range = col.max() - col.min();
            let step = Math.ceil(range / nbins);
            let start = Math.floor(col.min());
            for (let i = 0; i < nbins; i++) {
                bins[start + i * step] = 0;
            }
            this._t.forEach(function(row) {
                let elem = row[column];
                let i = Math.floor((elem - start) / step);
                bins[start + i * step] += 1;
            });
        } else {
            this._t.forEach(function (row) {
                let elem = row[column];
                if (elem.length != 0) {
                    if (elem in bins) {
                        bins[elem] += 1;
                    } else {
                        bins[elem] = 1;
                    }
                }
            });
        }
        console.log(bins);
        var data = [];
        var xs = Object.keys(bins);
        xs.sort((a, b) => parseInt(a) - parseInt(b));
        xs.forEach(function (x) {
            data.push({ 'x': x, 'y': bins[x] });
        });
        var templates = new vgt.VGTemplate();
        var id = this.cur_env();
        vg.parse.spec(templates.bar(data, '', ''), function (error, chart) {
            chart({ el: `#table-area-${id}` }).update();
        });
    }

    // create box-plots for each column
    boxplot() {
        let id = this.cur_env();
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
            chart({ el: `#table-area-${id}` }).update();
        });
    }

    construct_table_components() {
        let components = [];
        let _this = this;
        let ths = [];
        _this._labels.forEach(function(label) {
            ths.push(`<th data="${label}">${label}</th>`);
        });
        components.push(ths);

        _this._t.forEach(function(row, i) {
            let tds = [];
            _this._labels.forEach(function(label) {
                tds.push(`<td class="ds-table-elem" data="${row[label]}" row="${i}" col="${label}">${row[label]}</td>`);
            });
            components.push(tds);
        });

        return components;
    }

    construct_html_table(raw_components, hide_row = false, hide_col = false, kept_cols?: any[], title?) {
        let s = `<table class="ds-table">`;

        if (title) {
            s = `<h5>Preview for <span class="code">${title}</span></h5>` + s;
        }

        let dot_counts;
        if (raw_components.length > 10 && hide_row) {
            for (let i = 0; i < 5; i++) {
                s += '<tr>';
                let row = this.construct_html_row(raw_components[i], hide_col, kept_cols);
                dot_counts = row.length;
                s += row.join('');
                s += '</tr>';
            }

            s += '<tr class="blank">';
            let blank_row_cols_count;
            if (hide_col && (raw_components[0].length > 10)) {
                blank_row_cols_count = kept_cols ? dot_counts : 11;
            } else {
                blank_row_cols_count = kept_cols ? dot_counts : raw_components[0].length;
            }

            for (let i = 0; i < blank_row_cols_count; i++) {
                s += `<td>...</td>`;
            }
            s += '</tr>';

            for (let i = raw_components.length - 5; i < raw_components.length; i++) {
                s += '<tr>';
                s += this.construct_html_row(raw_components[i], hide_col, kept_cols).join('');
                s += '</tr>';
            }
        } else {
            // first row
            let row = '<tr>' + this.construct_html_row(raw_components[0], hide_col, kept_cols).join('') + '</tr>';
            s += $(row).attr('class', 'table-header').prop('outerHTML');

            for (let i = 1; i < raw_components.length; i++) {
                s += '<tr>';
                s += this.construct_html_row(raw_components[i], hide_col, kept_cols).join('');
                s += '</tr>';
            }

            // last row
            // row = '<tr>' + this.construct_html_row(raw_components[raw_components.length - 1], hide_col, kept_cols).join('') + '</tr>';
            // s += $(row).attr('class', 'last-row').prop('outerHTML');
        }

        s += '</table>';

        return s;
    }

    construct_html_table_peek(raw_components, peek_indices, label, hide_col, kept_cols?: any[]) {
        let s = '<table class="ds-table">';
        let rown = peek_indices.length > 5 ? 5 : peek_indices.length;
        // console.log('raw_components.length = ' + raw_components.length);
        // console.log('peek_indices.length = ' + peek_indices.length);
        if (raw_components.length <= peek_indices.length) {
            rown = raw_components.length - 1;
        }

        let table_head = this.construct_html_row(raw_components[0], hide_col, kept_cols);
        s += '<tr>' + table_head.join('') + '</tr>';
        if (peek_indices[0] > 0) {
            s += this.construct_blank_row(table_head.length);
        }
        for (let i = 0; i < rown; i++) {
            s += '<tr>' + this.construct_html_row(raw_components[peek_indices[i] + 1], hide_col, kept_cols).join('') + '</tr>';
        }
        s += this.construct_blank_row(table_head.length);
        s += '</table>';
        return s;
    }

    construct_blank_row(n) {
        let s = '<tr>';
        for (let i = 0; i < n; i++) {
            s += '<td>...</td>';
        }
        s += '</tr>';
        return s;
    }

    construct_html_row(components, hide_col, kept_cols?: any[]) {
        // [TODO] hide-show buttons for hidden columns
        let row = [];
        if (kept_cols) {
            if (kept_cols[0] > 0) {
                row.push('<td class="blank">...</td>');
            }

            for (let i = 0; i < kept_cols.length - 1; i++) {
                row.push(components[kept_cols[i]]);
                if (kept_cols[i] + 1 != kept_cols[i + 1]) {
                    row.push('<td class="blank">...</td>');
                }
            }

            row.push(components[kept_cols[kept_cols.length - 1]]);
            if (kept_cols[kept_cols.length - 1] < (this._labels.length - 1)) {
                row.push('<td class="blank">...</td>');
            }

            return row;
        } else {
            if (components.length > 10 && hide_col) {
                for (let i = 0; i < 5; i++) {
                    row.push(components[i]);
                }

                row.push('<td class="blank">...</td>');

                for (let i = components.length - 5; i < components.length; i++) {
                    row.push(components[i]);
                }

                return row;
            } else {
                return components;
            }
        }
    }

    _as_args(...args) {
        return args;
    }

    // basic procedures for previewing
    // 1 call the actual mutation functions
    // 2 construct html partial tags
    // 3 do customization, use jquery if necessary
    // 4 combine them into the real table
    // 5 show the table
    // this will also affect the actual show function
    // change impure (e.g. with_row) functions to pure functions
    preview(method_call) {
        let method_name = method_call.slice(0, method_call.indexOf('('));
        let args = method_call.slice(method_call.indexOf('(') + 1, method_call.lastIndexOf(')'));

        // console.log(`method_call: ${method_call}, method_name: ${method_name}, args: ${args}`);

        if (method_name == 'add_row' || method_name == 'add_rows') {
            let new_table = eval(`this.${method_name}(${args})`);
            args = method_name == 'add_row' ? [eval(`this._as_args(${args})`)] : eval(`this._as_args(${args})`)[0];
            let raw_components = new_table.construct_table_components();
            for (let row = 1; row <= args.length; row++) {
                for (let i = 0; i < raw_components[0].length; i++) {
                    raw_components[raw_components.length - row][i] = $(raw_components[raw_components.length - row][i]).attr('class', 'preview').prop('outerHTML');
                }
            }

            $(`#preview-${this.cur_env()}`).html(new_table.construct_html_table(raw_components, true, true, null, method_call));
        } else if (method_name == 'add_column' || method_name == 'add_columns') {
            let new_table = eval(`this.${method_name}(${args})`);
            args = eval(`this._as_args(${args})`);
            let raw_components = new_table.construct_table_components();
            for (let col = 1; col <= args.length / 2; col++) {
                for (let i = 0; i < raw_components.length; i++) {
                    raw_components[i][raw_components[i].length - col] = $(raw_components[i][raw_components[i].length - col]).attr('class', 'preview').prop('outerHTML');
                }
            }

            $(`#preview-${this.cur_env()}`).html(new_table.construct_html_table(raw_components, true, true, null, method_call));
        } else if (method_name == 'select_columns' || method_name == 'drop_columns') {
            // [bug] what if we do t.drop('1', '2', '3').drop('1') - we should get an error?
            let raw_components = this.construct_table_components();
            let label_locs = eval(`this._as_label_indices(${args})`);
            for (let i = 0; i < raw_components.length; i++) {
                label_locs.forEach(function(loc) {
                    raw_components[i][loc] = $(raw_components[i][loc]).attr('class', method_name == 'select_columns' ? 'preview' : 'preview-del').prop('outerHTML');
                });
            }

            $(`#preview-${this.cur_env()}`).html(this.construct_html_table(raw_components, true, true, label_locs, method_call));
        } else if (method_name == 'rename_column') {
            // [bug] what if we give it a non-existing label name?
            args = eval(`this._as_args(${args})`);
            let raw_components = this.construct_table_components();
            let label_loc = this._as_label_index(args[0]);
            raw_components[0][label_loc] = $(raw_components[0][label_loc]).html(`<span class="preview-del">${args[0]}</span> <span class="preview-select">${args[1]}</span>`).attr('class', 'preview').prop('outerHTML');

            $(`#preview-${this.cur_env()}`).html(this.construct_html_table(raw_components, true, true, [label_loc], method_call));
        } else if (method_name == 'where') {
            // [TODO] hide_col strategies on this
            let res = eval(`this.iwhere(${args})`);
            let raw_components = this.construct_table_components();
            raw_components[0][res.label] = $(raw_components[0][res.label]).attr('class', 'preview-select').prop('outerHTML');
            res.index.forEach(function(i) {
                for (let j = 0; j < raw_components[i + 1].length; j++) {
                    raw_components[i + 1][j] = $(raw_components[i + 1][j]).attr('class', 'preview').prop('outerHTML');
                }
            });

            $(`#preview-${this.cur_env()}`).html(this.construct_html_table_peek(raw_components, res.index, res.label, false));
        } else if (method_name == 'sorted') {
            let sorted_table = eval(`this.sorted(${args})`);
            args = eval(`this._as_args(${args})`);
            let raw_components = sorted_table.construct_table_components();
            let label_loc = sorted_table._as_label_index(args[0]);
            // raw_components[0] is the table header
            raw_components[0][label_loc] = $(raw_components[0][label_loc]).html(`${args[0]} sorted`).attr('class', 'preview-select').prop('outerHTML');
            for (let i = 1; i < raw_components.length; i++) {
                raw_components[i][label_loc] = $(raw_components[i][label_loc]).attr('class', 'preview').prop('outerHTML');
            }
            $(`#preview-${this.cur_env()}`).html(sorted_table.construct_html_table(raw_components, true, true, [label_loc], method_call));
        } else if (method_name == 'groupby' || method_name == 'groupsby') {
            let grouped_table = eval(`this.${method_name}(${args})`);
            args = eval(`this._as_args(${args})`);
            let group_labels = method_name == 'groupby' ? [args[0]] : args[0];
            let left_group_indices = this._as_label_indices(group_labels);
            let left_raw_components = this.construct_table_components();
            for (let i = 0; i < left_raw_components.length; i++) {
                left_group_indices.forEach(function(lgi) {
                    left_raw_components[i][lgi] = $(left_raw_components[i][lgi]).attr('class', i == 0 ? 'preview-select' : 'preview').prop('outerHTML');
                });
            }
            let left_table = this.construct_html_table(left_raw_components, true, true, left_group_indices);

            let right_group_indices = grouped_table._as_label_indices(group_labels);
            let right_raw_components = grouped_table.construct_table_components();
            for (let i = 0; i < right_raw_components.length; i++) {
                right_group_indices.forEach(function(rgi) {
                    right_raw_components[i][rgi] = $(right_raw_components[i][rgi]).attr('class', i == 0 ? 'preview-select' : 'preview').prop('outerHTML');
                });
            }
            let right_table = grouped_table.construct_html_table_peek(right_raw_components, [0, 1, 2, 3, 4], null, false);

            let template = `
                <h5>Preview for <span class="code">${method_call}</span></h5>
                <div class="multi-table-preview">
                    <table>
                        <tr class="preview-layout">
                            <td class="preview-layout">${left_table}</td>
                            <td class="preview-layout">=></td>
                            <td class="preview-layout">${right_table}</td>
                        </tr>
                    </table>
                </div>
            `;

            $(`#preview-${this.cur_env()}`).html(template);
        } else if (method_name == 'pivot') {
            let pivoted_table = eval(`this.pivot(${args})`);
            args = eval(`this._as_args(${args})`);
            let left_pivot_indices = this._as_label_indices(args[0], args[1], args[2]);
            let left_raw_components = this.construct_table_components();
            for (let i = 1; i < left_raw_components.length; i++) {
                left_raw_components[i][left_pivot_indices[0]] = $(left_raw_components[i][left_pivot_indices[0]]).attr('class', 'preview').prop('outerHTML');
            }
            left_raw_components[0][left_pivot_indices[1]] = $(left_raw_components[0][left_pivot_indices[1]]).attr('class', 'preview-select').prop('outerHTML');
            let left_table = this.construct_html_table(left_raw_components, true, true, left_pivot_indices);

            let right_raw_components = pivoted_table.construct_table_components();
            right_raw_components[0][0] = $(right_raw_components[0][0]).attr('class', 'preview-select').prop('outerHTML');
            for (let i = 1; i < right_raw_components[0].length; i++) {
                right_raw_components[0][i] = $(right_raw_components[0][i]).attr('class', 'preview').prop('outerHTML');
            }
            let right_table = pivoted_table.construct_html_table_peek(right_raw_components, [0, 1, 2, 3, 4], null, true);

            let template = `
                <h5>Preview for <span class="code">${method_call}</span></h5>
                <div class="multi-table-preview">
                    <table>
                        <tr class="preview-layout">
                            <td class="preview-layout">${left_table}</td>
                            <td class="preview-layout">=></td>
                            <td class="preview-layout">${right_table}</td>
                        </tr>
                    </table>
                </div>
            `;

            $(`#preview-${this.cur_env()}`).html(template);
        } else if (method_name == 'join') {
            let joined_table = eval(`this.join(${args})`);
            args = eval(`this._as_args(${args})`);
            let left_raw_components = this.construct_table_components();
            let left_join_index = this._as_label_index(args[0]);
            left_raw_components[0][left_join_index] = $(left_raw_components[0][left_join_index]).attr('class', 'preview-select').prop('outerHTML');
            for (let i = 1; i < left_raw_components.length; i++) {
                left_raw_components[i][left_join_index] = $(left_raw_components[i][left_join_index]).attr('class', 'preview').prop('outerHTML');
            }
            let left_table = this.construct_html_table(left_raw_components, true, true, [left_join_index]);

            let middle_raw_components = args[1].construct_table_components();
            let middle_join_index = args[1]._as_label_index(args.length == 3 ? args[2] : args[0]);
            middle_raw_components[0][middle_join_index] = $(middle_raw_components[0][middle_join_index]).attr('class', 'preview-select').prop('outerHTML');
            for (let i = 1; i < middle_raw_components.length; i++) {
                middle_raw_components[i][middle_join_index] = $(middle_raw_components[i][middle_join_index]).attr('class', 'preview').prop('outerHTML');
            }
            let middle_table = args[1].construct_html_table(middle_raw_components, true, true, [middle_join_index]);

            let right_raw_components = joined_table.construct_table_components();
            let right_join_index = joined_table._as_label_index(args[0]);
            right_raw_components[0][right_join_index] = $(right_raw_components[0][right_join_index]).html(`${args[0]} - ${args.length == 3 ? args[2] : args[0]}`).attr('class', 'preview-select').prop('outerHTML');
            for (let i = 1; i < right_raw_components.length; i++) {
                right_raw_components[i][right_join_index] = $(right_raw_components[i][right_join_index]).attr('class', 'preview').prop('outerHTML');
            }
            let right_table = joined_table.construct_html_table_peek(right_raw_components, [0, 1, 2, 3, 4], null, true);

            let template = `
                <h5>Preview for <span class="code">${method_call}</span></h5>
                <div class="multi-table-preview">
                    <table>
                        <tr class="preview-layout">
                            <td class="preview-layout">${left_table}</td>
                            <td class="preview-layout">join</td>
                            <td class="preview-layout">${middle_table}</td>
                            <td class="preview-layout">=></td>
                            <td class="preview-layout">${right_table}</td>
                        </tr>
                    </table>
                </div>
            `;

            $(`#preview-${this.cur_env()}`).html(template);
        } else if (method_name == 'self') {
            let raw_components = this.construct_table_components();
            $(`#preview-${this.cur_env()}`).html(this.construct_html_table_peek(raw_components, [0, 1, 2, 3, 4], null, true));
        } else {
            console.warn(`Method call not supported: ${method_call}`);
        }
    }
}