window.$ = window.jQuery = require('jquery');
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
        editor.getSession().setMode("ace/mode/javascript");
        editor.getSession().setUseWrapMode(true);
        let data_link = $(_this).attr('data-link');        
        $(`#history-${datai}`).append(`<b>This table is denoted as t${datai}</b>`);
        window.datai = datai;
        // eval(code);
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