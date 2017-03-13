declare var d3: any;

export class VGTemplate {
    constructor() {

    }

    public boxplot(_values) {
        let spec = {
            "name": "boxplot",
            "height": 200,
            "padding": "auto",
            "width": 600,
            "signals": [
                {
                    "name": "boxSize",
                    "init": 40
                }
            ],
            "axes": [
                {
                    "type": "x",
                    "scale": "x"
                },
                {
                    "offset": 5,
                    "properties": {
                        "axis": {
                            "stroke": {
                                "value": "transparent"
                            }
                        }
                    },
                    "type": "y",
                    "scale": "y",
                    "tickSize": 0
                }
            ],
            "scales": [
                {
                    "name": "y",
                    "points": true,
                    "padding": 1.5,
                    "range": "height",
                    "domain": {
                        "data": "table",
                        "field": "x"
                    },
                    "type": "ordinal",
                    "round": true
                },
                {
                    "name": "x",
                    "nice": true,
                    "range": "width",
                    "domain": {
                        "data": "table",
                        "field": [
                            "y"
                        ]
                    },
                    "type": "linear",
                    "round": true
                }
            ],
            "data": [
                {
                    "name": "table",
                    "values": _values
                    // "values": [
                    //     {
                    //         "x": 6,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 21
                    //     },
                    //     {
                    //         "x": 6,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 21
                    //     },
                    //     {
                    //         "x": 4,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 22.8
                    //     },
                    //     {
                    //         "x": 6,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 21.4
                    //     },
                    //     {
                    //         "x": 8,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 18.7
                    //     },
                    //     {
                    //         "x": 6,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 18.1
                    //     },
                    //     {
                    //         "x": 8,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 14.3
                    //     },
                    //     {
                    //         "x": 4,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 24.4
                    //     },
                    //     {
                    //         "x": 4,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 22.8
                    //     },
                    //     {
                    //         "x": 6,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 19.2
                    //     },
                    //     {
                    //         "x": 6,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 17.8
                    //     },
                    //     {
                    //         "x": 8,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 16.4
                    //     },
                    //     {
                    //         "x": 8,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 17.3
                    //     },
                    //     {
                    //         "x": 8,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 15.2
                    //     },
                    //     {
                    //         "x": 8,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 10.4
                    //     },
                    //     {
                    //         "x": 8,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 10.4
                    //     },
                    //     {
                    //         "x": 8,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 14.7
                    //     },
                    //     {
                    //         "x": 4,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 32.4
                    //     },
                    //     {
                    //         "x": 4,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 30.4
                    //     },
                    //     {
                    //         "x": 4,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 33.9
                    //     },
                    //     {
                    //         "x": 4,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 21.5
                    //     },
                    //     {
                    //         "x": 8,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 15.5
                    //     },
                    //     {
                    //         "x": 8,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 15.2
                    //     },
                    //     {
                    //         "x": 8,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 13.3
                    //     },
                    //     {
                    //         "x": 8,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 19.2
                    //     },
                    //     {
                    //         "x": 4,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 27.3
                    //     },
                    //     {
                    //         "x": 4,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 26
                    //     },
                    //     {
                    //         "x": 4,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 30.4
                    //     },
                    //     {
                    //         "x": 8,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 15.8
                    //     },
                    //     {
                    //         "x": 6,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 19.7
                    //     },
                    //     {
                    //         "x": 8,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 15
                    //     },
                    //     {
                    //         "x": 4,
                    //         "y2": 0,
                    //         "group": 1,
                    //         "y": 21.4
                    //     }
                    // ]
                },
                {
                    "name": "stats",
                    "source": "table",
                    "transform": [
                        {
                            "type": "aggregate",
                            "groupby": [
                                "x"
                            ],
                            "summarize": {
                                "y": ["min", "max", "median", "q1", "q3", "valid"]
                            }
                        }
                    ]
                },
                {
                    "name": "iqrcalcs",
                    "source": "stats",
                    "transform": [{ "type": "formula", "field": "lower", "expr": "max(datum.min_y,datum.q1_y-1.5*(datum.q3_y-datum.q1_y))" },
                    { "type": "formula", "field": "upper", "expr": "min(datum.max_y,datum.q3_y+1.5*(datum.q3_y-datum.q1_y))" }]
                }
            ],
            "marks": [
                {
                    "properties": {
                        "enter": {
                            "height": {
                                "value": 1
                            },
                            "x2": {
                                "field": "upper",
                                "scale": "x"
                            },
                            "x": {
                                "field": "lower",
                                "scale": "x"
                            },
                            "yc": {
                                "field": "x",
                                "scale": "y"
                            },
                            "fill": {
                                "value": "#888"
                            }
                        }
                    },
                    "from": {
                        "data": "iqrcalcs"
                    },
                    "type": "rect"
                },
                {
                    "type": "rect",
                    "from": { "data": "iqrcalcs" },
                    "properties": {
                        "enter": {
                            "x": { "scale": "x", "field": "q1_y" },
                            "x2": { "scale": "x", "field": "q3_y" },
                            "yc": { "scale": "y", "field": "x" },
                            "height": { "signal": "boxSize" },
                            "fill": { "value": "green" },
                            "stroke": { "value": "#888" }
                        }
                    }
                },
                {
                    "type": "rect",
                    "from": { "data": "iqrcalcs" },
                    "properties": {
                        "enter": {
                            "x": { "scale": "x", "field": "median_y" },
                            "width": { "value": 2 },
                            "yc": { "scale": "y", "field": "x" },
                            "height": { "signal": "boxSize" },
                            "fill": { "value": "#000" }
                        }
                    }
                },
                {
                    "type": "rect",
                    "from": { "data": "iqrcalcs" },
                    "properties": {
                        "enter": {
                            "x": { "scale": "x", "field": "lower" },
                            "width": { "value": 1 },
                            "yc": { "scale": "y", "field": "x" },
                            "height": { "signal": "boxSize", "mult": 0.5 },
                            "fill": { "value": "#000" }
                        }
                    }
                },
                {
                    "type": "rect",
                    "from": { "data": "iqrcalcs" },
                    "properties": {
                        "enter": {
                            "x": { "scale": "x", "field": "upper" },
                            "width": { "value": 1 },
                            "yc": { "scale": "y", "field": "x" },
                            "height": { "signal": "boxSize", "mult": 0.5 },
                            "fill": { "value": "#000" }
                        }
                    }
                },
                {
                    "type": "symbol",
                    "from": { "data": "stats" },
                    "properties": {
                        "enter": {
                            "x": { "scale": "x", "field": "min_y" },
                            "yc": { "scale": "y", "field": "x" },
                            "size": { "value": 20 },
                            "stroke": { "value": "#000" },
                            "fill": { "value": "#fff" }

                        }
                    }
                },
                {
                    "type": "symbol",
                    "from": { "data": "stats" },
                    "properties": {
                        "enter": {
                            "x": { "scale": "x", "field": "max_y" },
                            "yc": { "scale": "y", "field": "x" },
                            "size": { "value": 20 },
                            "stroke": { "value": "#000" },
                            "fill": { "value": "#fff" }

                        }
                    }
                }
            ]
        }

        return spec;
    }

    public plot(_values, xtitle, ytitle) {
        // let xmin = Math.round(d3.min(_values.map(x => x.x)));
        // let xmax = Math.round(d3.max(_values.map(x => x.x)));
        let spec = {
            "width": 600,
            "height": 400,
            "padding": "auto",
            "data": [
                {
                    "name": "source",
                    // "url": "data/stocks.csv",
                    // "format": {
                    //     "type": "csv",
                    //     "parse": { "date": "date", "price": "number" }
                    // },
                    // "transform": [
                    //     {
                    //         "type": "filter",
                    //         "test": "datum[\"date\"] !== null && !isNaN(datum[\"date\"]) && datum[\"price\"] !== null && !isNaN(datum[\"price\"])"
                    //     },
                    //     { "type": "filter", "test": "datum.symbol==='GOOG'" }
                    // ]
                    "values": _values
                },
                {
                    "name": "layout",
                    "values": [{}],
                    "transform": [
                        { "type": "formula", "field": "width", "expr": "600" },
                        { "type": "formula", "field": "height", "expr": "400" }
                    ]
                }
            ],
            "marks": [
                {
                    "name": "root",
                    "type": "group",
                    // "description": "Google's stock price over time.",
                    "from": { "data": "layout" },
                    "properties": {
                        "update": {
                            "width": { "field": "width" },
                            "height": { "field": "height" }
                        }
                    },
                    "marks": [
                        {
                            "name": "marks",
                            "type": "line",
                            "from": {
                                "data": "source"
                                // "transform": [{ "type": "sort", "by": "-date" }]
                            },
                            "properties": {
                                "update": {
                                    "x": { "scale": "x", "field": "x" },
                                    "y": { "scale": "y", "field": "y" },
                                    "strokeWidth": { "value": 2 },
                                    "stroke": { "value": "#4682b4" }
                                }
                            }
                        }
                    ],
                    "scales": [
                        {
                            "name": "x",
                            "type": "linear",
                            "domain": {
                                "data": "source",
                                "field": "x",
                                // "sort": { "field": "date", "op": "min" }
                            },
                            "rangeMin": 0,
                            "rangeMax": 600,
                            "round": true
                        },
                        {
                            "name": "y",
                            "type": "linear",
                            "domain": {
                                "data": "source",
                                "field": "y"
                            },
                            "rangeMin": 400,
                            "rangeMax": 0,
                            "round": true,
                            "nice": true,
                            "zero": true
                        }
                    ],
                    "axes": [
                        {
                            "type": "x",
                            "scale": "x",
                            "grid": true,
                            "layer": "back",
                            "ticks": 5,
                            "title": xtitle,
                            // "values": [1,2,3,4,5]
                            // "properties": {
                            //     "labels": {
                            //         "text": {
                            //             "template": "{{datum.data}}"
                            //         },
                            //         "angle": { "value": 270 },
                            //         "align": { "value": "right" },
                            //         "baseline": { "value": "middle" }
                            //     }
                            // }
                        },
                        {
                            "type": "y",
                            "scale": "y",
                            "format": "s",
                            "grid": true,
                            "layer": "back",
                            "title": ytitle
                        }
                    ]
                }
            ]
        };
        return spec;
    }

    public scatter(_values, xtitle, ytitle) {
        let spec = {
            "width": 600,
            "height": 400,
            "data": [
                {
                    "name": "gdp",
                    // "url": "data/gdp.csv",
                    // "format": {
                    //     "type": "csv",
                    //     "parse": {
                    //         "agriculture_2010": "number",
                    //         "industry_2010": "number"
                    //     }
                    // }
                    "values": _values
                }
            ],
            "scales": [
                {
                    "name": "xscale",
                    "type": "linear",
                    "domain": {
                        "data": "gdp",
                        "field": ["x"]
                    },
                    "range": "width",
                    "nice": true
                },
                {
                    "name": "yscale",
                    "type": "linear",
                    "domain": {
                        "data": "gdp",
                        "field": ["y"]
                    },
                    "range": "height",
                    "nice": true
                }
            ],
            "axes": [
                {
                    "type": "x",
                    "scale": "xscale",
                    "orient": "bottom",
                    "title": xtitle
                },
                {
                    "type": "y",
                    "scale": "yscale",
                    "orient": "left",
                    "title": ytitle
                }
            ],
            "marks": [
                {
                    "type": "symbol",
                    "from": {
                        "data": "gdp"
                    },
                    "properties": {
                        "enter": {
                            "x": {
                                "field": "x",
                                "scale": "xscale"
                            },
                            "y": {
                                "field": "y",
                                "scale": "yscale"
                            },
                            "size": { "value": 49 },
                            "fill": { "value": "#3182bd" },
                            "opacity": { "value": 0.7 }
                        },
                        "update": {
                            "fill": { "value": "#3182bd" }
                        },
                        "hover": {
                            "fill": { "value": "#de2d26" }
                        }
                    }
                },
                {
                    "type": "text",
                    "properties": {
                        "enter": {
                            "fill": { "value": "black" }
                        },
                        "update": {
                            "x": {
                                "scale": "xscale",
                                "signal": "hover.x",
                                "offset": 5
                            },
                            "y": {
                                "scale": "yscale",
                                "signal": "hover.y",
                                "offset": -5
                            }
                            // "text": { "signal": "hover.country_name" }
                        }
                    }
                }
            ],
            "signals": [
                {
                    "name": "hover",
                    "init": {},
                    "streams": [
                        { "type": "symbol:mouseover", "expr": "datum" },
                        { "type": "symbol:mouseout", "expr": "{}" }
                    ]
                }
            ]
        }

        return spec;
    }

    public bar(_values, xtitle, ytitle) {
        let spec = {
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

            "axes": [
                {
                    "type": "x",
                    "scale": "x",
                    "title": xtitle
                },
                {
                    "type": "y",
                    "scale": "y",
                    "title": ytitle
                }
            ],

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

        return spec;
    }

    public vbar(_values) {
        var spec = {
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
                            "output": { "start": "bin_start", "end": "bin_end" },
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

        return spec;
    }
}
