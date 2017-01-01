window.$ = window.jQuery = require('jquery');
window.d3 = require('d3');
window.vg = require('vega');

$(document).ready(function() {
    $('a').each(function(i) {
        console.log($(this).attr('href'));
        if ($(this).attr('href') && $(this).attr('href').endsWith('.csv')) {            
            $(this).after(`<button class="open-dsjs">Toggle ds.js</button>`);
        }
    });

    var editor;

    $(".open-dsjs").click(function() {
        if ($(".env").length) {
            $('.env').toggle();    
        } else {
            var ds_env = `
                <div class="env">
                    <div class="repl">
                        <div class="inputs">
                            <div class="editor"></div>
                            <button class="run">Run</button>
                        </div>
                    </div>
                    <div class="show-panel">
                        <div class="vis"></div>
                        <div class="table-area"></div>
                    </div>
                </div>
            `;
            $(this).after(ds_env);
            editor = ace.edit($('.editor')[0]);
            editor.setTheme("ace/theme/chrome");
            editor.getSession().setMode("ace/mode/javascript");
            $('.env').toggle();
        }

        $('.run').click(function() {
            $('.vis').html('');
            $('.table-area').html('');
            var code = editor.getValue();
            eval(code);
        });
    });
});