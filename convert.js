const fs = require('fs');
const cio = require('cheerio');
const data = fs.readFileSync(0, 'utf-8');
const $ = cio.load(data);

for (let i = 0; i <= 4; i++) {
    $('h' + i).each(function () {
        $(this).attr('id', null);
        $(this).addClass('style' + i + 'c');
    });
}

for (const el of $('a[clink]')) {
    let src = $(el).attr('src');
    $(el).replaceWith(`[clink url="${src}"]`);
}

let pres = $('pre');
for (let pre of pres) {
    let code = pre.firstChild;
    //JavaScript
    if ($(code).hasClass('language-javascript')) {
        $(code).attr('class', null);
        $(pre).addClass('prism');
        $(pre).addClass('undefined-numbers');
        $(pre).addClass('lang-js');
        $(pre).attr('data-lang', 'JavaScript');
        $(pre).replaceWith(`
        <div class="hcb_wrap">
        ${$.html(pre)}
        </div>
        `);
    //CSS
    } else if ($(code).hasClass('language-css')) {
        $(code).attr('class', null);
        $(pre).addClass('prism');
        $(pre).addClass('undefined-numbers');
        $(pre).addClass('lang-css');
        $(pre).attr('data-lang', 'CSS');
        $(pre).replaceWith(`
        <div class="hcb_wrap">
        ${$.html(pre)}
        </div>
        `);
    //HTML
    } else if ($(code).hasClass('language-html')) {
        $(code).attr('class', null);
        $(pre).addClass('prism');
        $(pre).addClass('undefined-numbers');
        $(pre).addClass('lang-html');
        $(pre).attr('data-lang', 'HTML');
        $(pre).replaceWith(`
        <div class="hcb_wrap">
        ${$.html(pre)}
        </div>
        `);
    //Plain Text
    } else if ($(code).hasClass('language-plain')) {
        $(code).attr('class', null);
        $(pre).addClass('prism');
        $(pre).addClass('undefined-numbers');
        $(pre).addClass('lang-plain');
        $(pre).attr('data-lang', 'Plain Text');
        $(pre).replaceWith(`
        <div class="hcb_wrap">
        ${$.html(pre)}
        </div>
        `);
    //JSON
    } else if ($(code).hasClass('language-json')) {
        $(code).attr('class', null);
        $(pre).addClass('prism');
        $(pre).addClass('undefined-numbers');
        $(pre).addClass('lang-json');
        $(pre).attr('data-lang', 'JSON');
        $(pre).replaceWith(`
        <div class="hcb_wrap">
        ${$.html(pre)}
        </div>
        `);
    } else {
        console.error('ダメだったんだ, あの言語知らんのだ', $(pre).html());
        return;
    }
}

console.log($('body').html());