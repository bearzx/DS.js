import * as tables from './src/tables';

var t = new tables.Table();
// t.read_table_csv('demodata.csv', function() {
//     console.log(t.num_rows());
// });
t.read_table_csv_sync('data/demodata.csv');
// t.read_table_csv_sync('data/city_property_details_datasd_1.csv');
// console.log(t.num_rows());
// console.log(t.num_columns());
// console.log(t.labels());
// console.log(t.row(5));
// console.log(t.column_by_id(0));
// console.log(t.columns());
// t.hist('month_acquired');
// t.vhist('month_acquired');
t.with_row([0, 0, 0, 0]);
t.with_row({'a': 1, 'b': 2, 'c': 3, 'd': 4});
t.with_rows([[9, 10, 11, 12], [1, 2, 3, 4]]);
t.show();