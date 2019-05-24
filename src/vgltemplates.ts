declare var d3: any;

export class VGLTemplate {
    constructor() {

    }

    public histogram(_values, nbins) {
        let spec = {
            "data": {
                "values": _values
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "bin": { "maxbins": nbins },
                    "field": "x",
                    "type": "quantitative"
                },
                "y": {
                    "aggregate": "count",
                    "field": "*",
                    "type": "quantitative"
                }
            },
            "width": 600,
            "height": 300
        };

        return spec;
    }

    public barplot(_values, xtitle, ytitle, xtype, ytype) {
        let spec = {
            "data": {
                "values": _values
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "x",
                    "title": xtitle,
                    "type": xtype
                },
                "y": {
                    // "aggregate": "average",
                    "field": "y",
                    "title": ytitle,
                    "type": ytype
                }
            },
            "width": 600,
            "height": 300
        };

        return spec;
    }

    public lineplot(_values, xtitle, ytitle, xtype) {
        let spec = {
            "data": { "values": _values },
            "mark": "line",
            "encoding": {
                "x": {
                    "field": "x",
                    "type": xtype,
                    "axis": {
                        'ticks': _values.length
                    },
                    "title": xtitle
                },
                "y": {
                    "field": "y",
                    "type": "quantitative",
                    "title": ytitle
                }
            },
            "width": 600,
            "height": 300
        };

        return spec;
    }

    public scatterplot(_values, xtitle, ytitle, xtype) {
        let spec = {
            "data": { "values": _values },
            "mark": "circle",
            "encoding": {
                "x": {
                    "field": "x",
                    "type": xtype,
                    "axis": {
                        'ticks': 10
                    },
                    "title": xtitle
                },
                "y": {
                    "field": "y",
                    "type": "quantitative",
                    "title": ytitle
                }
            },
            "width": 600,
            "height": 300,
        };

        return spec;
    }

    public boxplot(_values, xlabel, ylabel, xtype = "quantitative", ytype = "nominal") {
        let spec = {
            "data": {"values": _values},
            "mark": "boxplot",
            "encoding": {
                "x": {
                    "field": xlabel,
                    "type": xtype,
                    "axis": {"title": xlabel}
                },
                "y": {
                    "field": ylabel,
                    "type": ytype
                }
            }
        };

        return spec;
    }

}