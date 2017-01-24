window.$ = window.jQuery = require('jquery');
// window.d3 = require('script!../libs/d3.v3.min.js');
// window.vg = require('script!../libs/vega/vega.js');
window.datai = '';

$(document).ready(function() {
    $('a').each(function(i) {
        // console.log($(this).attr('href'));
        let data_link = $(this).attr('href');
        if (data_link && data_link.endsWith('.csv')) {
            $(this).after(`<button datai="${i}" data-link=${data_link} class="open-dsjs btn btn-primary btn-xs">Toggle ds.js</button>`);
        }
    });

    $(".open-dsjs").click(function() {
        var datai = $(this).attr('datai');
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
                        </div>
                    </div>
                    <div class="show-panel">
                        <div id="vis-${datai}" class="vis"></div>
                        <div id="table-area-${datai}" class="table-area"></div>
                    </div>                    
                </div>
                <div style="clear: both"></div>
            `;            
            
            let cur = this;
            let block_styles = ['block', 'inline-block'];
            while (!block_styles.includes($(cur).css('display'))) {
                // console.log($(cur).css('display'));
                cur = $(cur).parent();
            }
            // console.log($(cur).get(0).tagName);
            $(cur).after(ds_env);
            var editor = ace.edit(editor_id);
            editor.setTheme("ace/theme/chrome");
            editor.getSession().setMode("ace/mode/javascript");
            editor.getSession().setUseWrapMode(true);            
            let data_link = $(this).attr('data-link');
            let code = `t${datai} = new Table.Table(null, null, '${data_link}');`;
            $(`#history-${datai}`).append(`<pre>${code}</pre>`);
            window.datai = datai;
            eval(code);
            $(env_id).toggle();
        }

        $('.run').click(function() {
            var datai = $(this).attr('datai');
            $(`#vis-${datai}`).html('');
            $(`#table-area-${datai}`).html('');
            var editor = ace.edit(`editor-${datai}`);
            var code = editor.getValue();            
            $(`#history-${datai}`).append(`<pre>${code}</pre>`);
            editor.setValue('');
            window.datai = datai;            
            eval(code);
        });
    });
});