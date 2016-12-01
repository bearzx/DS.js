declare var d3: any;
declare var $: any;

export class Table {

    private _t: any = [];

    constructor() {

    }

    read_table() {

    }
    
    public read_table_csv_async(url: string, callback: any) {
        var _this_ = this;
        d3.csv(url, function(data) {
            _this_._t = data;
            callback();
        });
    }

    public read_table_csv_sync(url: string) {
        var _this_ = this;
        $.ajax({
            dataType: "text",
            url: url,
            async: false,
            success: function(data){ 
                _this_._t = d3.csvParse(data);
            }
        });
    }

    num_rows() {
        // console.log(this._t.length);
        // console.log(this._t);
        return this._t.length;
    }

    view_rows() {

    }

    view_row() {
        
    }

    labels() {

    }

    num_columns() {

    }

    columns() {

    }

    column() {

    }

    add_row() {

    }

    add_column() {

    }

    relabel() {

    }

    select_row() {

    }

    select_column() {

    }

    delete_row() {

    }

    delete_column() {

    }

    where() {

    }

    sort() {

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

    }

    plot() {

    }

    bar() {

    }

    scatter() {

    }

    hist() {

    }

    boxplot() {

    }

}