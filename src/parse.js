window.$ = window.jQuery = require('jquery');
window.esprima = require('esprima');
require('../libs/jquery.tableparser.js');
// window.d3 = require('script!../libs/d3.v3.min.js');
// window.vg = require('script!../libs/vega/vega.js');
window.datai = '';

function env_init(_this, code) {
    var datai = $(_this).attr('datai');
    var env_id = '#env-' + datai;
    var editor_id = `editor-${datai}`;
    if ($(env_id).length) {
        // open existing environment
        $(env_id).toggle();
    } else {
        // create new environment
        var ds_env = `
            <div id="env-${datai}" class="env">
                <div class="repl">
                    <div class="history" id="history-${datai}"></div>
                    <div class="inputs">
                        <div id="${editor_id}" class="editor"></div>
                        <button datai="${datai}" class="run">Run</button>
                        <button datai="${datai}">Preview</button>
                    </div>
                </div>
                <div class="show-panel">
                    <div id="vis-${datai}" class="vis"></div>
                    <div id="table-area-${datai}" class="table-area"></div>
                </div>
            </div>
            <div style="clear: both"></div>
        `;

        let cur = _this;
        let block_styles = ['block', 'inline-block'];
        while (!block_styles.includes($(cur).css('display'))) {
            cur = $(cur).parent();
        }
        $(cur).after(ds_env);
        var editor = ace.edit(editor_id);
        editor.setTheme("ace/theme/chrome");
        // editor.setBehavioursEnabled(false);
        editor.getSession().setMode("ace/mode/javascript");
        editor.getSession().setUseWrapMode(true);

        editor.commands.addCommand({
            name: 'preview',
            bindKey: { win: 'Ctrl-B',  mac: 'Command-B' },
            exec: function(_editor) {
                let ast = esprima.parse(_editor.getValue(), { loc: true });
                let row = _editor.getCursorPosition().row;
                let col = _editor.getCursorPosition().column;
                let line = editor.getSession().getLine(row);

                for (let i = 0; i < ast.body.length; i++) {
                    let stmt = ast.body[i];
                    if (row == (stmt.loc.start.line - 1)) {
                        find_and_preview(stmt.expression, _editor, line, row, col, line.length);
                        break;
                    }
                }
            }
        });

        function find_and_preview(expr, editor, line, row, col, cur_end) {
            let callee;
            if (expr.type == 'CallExpression' || expr.type == 'AssignmentExpression') {
                if (expr.type == 'CallExpression') {
                    // if (expr.arguments) {
                    //     expr.arguments.forEach(function(arg) {
                    //         find_and_preview(arg, editor, line, row, col, arg.loc.end.column);
                    //     });
                    // }
                    callee = expr.callee;
                } else if (expr.type == 'AssignmentExpression') {
                    callee = expr.right.callee;
                }
                let last_callee;
                let callee_level = 0;
                while (callee && ('object' in callee)) {
                    let method_name = callee.property.name;
                    let method_start = callee.loc.end.column - callee.property.name.length;
                    let method_end = callee.loc.end.column;
                    if (is_supported_preview(method_name) && (col >= method_start && col <= method_end)) {
                        // console.log(`method ${callee.property.name} found`);
                        let method_call;

                        // console.log(callee.object.callee);
                        // console.log(`callee_level = ${callee_level}`);
                        if (callee_level == 0) {
                            method_call = line.slice(method_start, cur_end);
                        } else {
                            let last_method_start = last_callee.loc.end.column - last_callee.property.name.length;
                            method_call = line.slice(method_start, last_method_start - 1);
                        }

                        // console.log(`method_call: ${method_call}`);
                        let all_code = editor.getValue().split('\n');
                        let pre_eval_code = '';
                        for (let i = 0; i < row; i++) {
                            pre_eval_code += all_code[i] + '\n';
                        }
                        let cur_line_partial = line.slice(0, method_start - 1);
                        pre_eval_code += cur_line_partial;
                        let partial_result = eval(pre_eval_code);
                        eval(`partial_result.preview(\`${method_call}\`)`);
                        break;
                    } else {
                        last_callee = callee;
                        callee_level += 1;
                        callee = callee.object.callee;
                    }
                }
            }
        }

        function is_supported_preview(func_name) {
            let supported_functions = new Set([
                'with_row',
                'with_rows',
                'with_column',
                'with_columns',
                'select',
                'drop',
                'relabeled',
                'where',
                'sorted',
                'group',
                'groups',
                'pivot',
                'join'
            ]);

            return supported_functions.has(func_name);
        }

        editor.commands.addCommand({
            name: 'hl-preview-methods',
            bindKey: { win: 'Ctrl-G',  mac: 'Command-G' },
            exec: function(_editor) {
                let ast = esprima.parse(_editor.getValue(), { loc: true });
                ast.body.forEach(function(stmt) {
                    // console.log(stmt);
                    find_and_mark(stmt.expression, _editor);
                });
            }
        });

        function find_and_mark(expr, editor) {
            // [TODO] mark-ups are messed-up after we change the code
            // console.log(expr);
            let Range = ace.require('ace/range').Range;
            let callee;
            if (expr.type == 'CallExpression' || expr.type == 'AssignmentExpression') {
                if (expr.type == 'CallExpression') {
                    // if (expr.arguments) {
                    //     expr.arguments.forEach(function(arg) {
                    //         console.log(arg);
                    //         find_and_mark(arg, editor);
                    //     });
                    // }
                    callee = expr.callee;
                } else if (expr.type == 'AssignmentExpression') {
                    callee = expr.right.callee;
                }

                while (callee && ('object' in callee)) {
                    if (is_supported_preview(callee.property.name)) {
                        let r = new Range(callee.loc.start.line - 1, callee.loc.end.column - callee.property.name.length, callee.loc.end.line - 1, callee.loc.end.column);
                        editor.getSession().addMarker(r, "preview-hl", "line");
                    }
                    callee = callee.object.callee;
                }
            }
        }

        editor.on('click', function(e) {
            // let _editor = e.editor;
            // let row = _editor.getCursorPosition().row;
            // let col = _editor.getCursorPosition().column;
            // console.log(`row: ${row} col: ${col}`);
        });

        let data_link = $(_this).attr('data-link');
        $(`#history-${datai}`).append(`<b>This table is denoted as t${datai}</b>`);
        window._datai = datai;
        // eval(code); // I used to keep it to run some specialized init code
        $(env_id).toggle();
    }

    $('.run').click(function() {
        var datai = $(this).attr('datai');
        $(`#vis-${datai}`).html('');
        $(`#table-area-${datai}`).html('');
        var editor = ace.edit(`editor-${datai}`);
        var code = editor.getValue();
        console.log(code);
        $(`#history-${datai}`).append(`<pre>${code}</pre>`);
        editor.setValue('');
        window._datai = datai;
        eval(code);
    });
}

$(document).ready(function() {
    let datai = 0;
    // csv detection
    $('a').each(function(i) {
        let data_link = $(this).attr('href');
        if (data_link && data_link.endsWith('.csv')) {
            $(this).after(`<button datai="${datai}" data-link=${data_link} class="open-dsjs btn btn-primary btn-xs">Toggle ds.js</button>`);
            eval(`
                t${datai} = new Table.Table(null, null, '${data_link}', ${datai})
            `);
            datai += 1;
        }
    });

    // html table detection
    $('table').each(function(i) {
        $(this).after(`<button datai="${datai}" class="open-dsjs-htable btn btn-primary btn-xs">Toggle ds.js</button>`);
        $(this).addClass(`dsjs-htable-${datai}`);
        eval(`
            t${datai} = new Table.Table(null, null, null, ${datai});
            t${datai}.from_columns($('.dsjs-htable-${datai}').parsetable(true, true));
        `);
        datai += 1;
    });

    $(".open-dsjs-htable").click(function() {
        let datai = $(this).attr('datai');
        env_init(this, '');
    });

    $(".open-dsjs").click(function() {
        let datai = $(this).attr('datai');
        env_init(this, '');
    });
});