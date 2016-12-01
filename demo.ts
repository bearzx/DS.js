import * as tables from './tables';

var t = new tables.Table();
// t.read_table_csv('demodata.csv', function() {
//     console.log(t.num_rows());
// });
// t.read_table_csv_sync('demodata.csv');
t.read_table_csv_sync('city_property_details_datasd_1.csv');
console.log(t.num_rows());