export class VGTemplate {
    constructor() {

    }

    public bar(_values) {
        var x = {
            "width": 600,
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
    }

    public vbar(_values) {
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
                            "output": {"start": "bin_start", "end": "bin_end"},
                            "maxbins": 12
                        }
                        // ,{
                        //     "type": "aggregate",
                        //     "summarize": [
                        //         { "field": "bin_start", "ops": ["count"], "as": ["y"] }
                        //     ]
                        // }
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
    }
}
