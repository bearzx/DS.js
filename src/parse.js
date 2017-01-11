window.$ = window.jQuery = require('jquery');
// window.d3 = require('script!../libs/d3.v3.min.js');
// window.vg = require('script!../libs/vega/vega.js');
window.datai = '';

$(document).ready(function() {
    $('a').each(function(i) {
        console.log($(this).attr('href'));
        if ($(this).attr('href') && $(this).attr('href').endsWith('.csv')) {
            $(this).after(`<button datai="${i}" class="open-dsjs">Toggle ds.js</button>`);
        }
    });    

    $(".open-dsjs").click(function() {        
        var datai = $(this).attr('datai');
        var env_id = '#env-' + datai;        
        var editor_id = `editor-${datai}`;
        if ($(env_id).length) {
            $(env_id).toggle();
        } else {
            var ds_env = `
                <div id="env-${datai}" class="env">
                    <div class="repl">
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
            `;
            $(this).after(ds_env);
            var editor = ace.edit(editor_id);
            editor.setTheme("ace/theme/chrome");
            editor.getSession().setMode("ace/mode/javascript");
            $(env_id).toggle();
        }

        $('.run').click(function() {
            var datai = $(this).attr('datai');
            $(`#vis-${datai}`).html('');
            $(`#table-area-${datai}`).html('');
            var editor = ace.edit(`editor-${datai}`);
            var code = editor.getValue();
            window.datai = datai;
            eval(code);
        });
    });
});