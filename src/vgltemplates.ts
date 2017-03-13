declare var d3: any;

export class VGLTemplate {
    constructor() {

    }

    public plot(_values, xtitle, ytitle, xtype) {
        let spec = {
            "data": { "values": _values },
            "mark": "line",
            "encoding": {
                "x": {
                    "field": "x",
                    "type": xtype,
                    "axis": {
                        'ticks': _values.length
                    }
                },
                "y": {
                    "field": "y",
                    "type": "quantitative"
                }
            },
            "width": 600,
            "height": 300
        };

        let embed_spec = {
            mode: "vega-lite",
            spec: spec,
            actions: false
        };

        return embed_spec;
    }

    public scatter(_values, xtitle, ytitle, xtype) {
        let spec = {
            "data": { "values": _values },
            "mark": "circle",
            "encoding": {
                "x": {
                    "field": "x",
                    "type": xtype,
                    "axis": {
                        'ticks': _values.length
                    }
                },
                "y": {
                    "field": "y",
                    "type": "quantitative",
                }
            },
            "width": 600,
            "height": 300,
        };

        let embed_spec = {
            mode: "vega-lite",
            spec: spec,
            actions: false
        };

        return embed_spec;
    }

}