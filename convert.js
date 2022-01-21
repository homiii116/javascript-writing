const fs = require('fs');
const cio = require('cheerio');
const decode = require('unescape');
const { marked } = require('marked');
const frontMatter = require('front-matter');
const { spawnSync } = require('child_process');

function convert(input) {
    const $ = cio.load(input);
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
        } else if ($(code).hasClass('language-mermaid')) {
            let diagramSrc = decode($(code).html());
            if (!fs.existsSync("build")) {
                fs.mkdirSync("build");
            }
            fs.writeFileSync("build/tmp.mm", diagramSrc);

            spawnSync("./node_modules/.bin/mmdc", ["-w", "790", "-i", "build/tmp.mm", "-o", "build/tmp.svg"]);

            let svgSrc = fs.readFileSync("build/tmp.svg", 'utf-8');
            $(pre).replaceWith(svgSrc);
        } else {
            console.error('ダメだったんだ, あの言語知らんのだ', $(pre).html());
            return null;
        }
    }

    return $('body').html();
}

module.exports = convert;

// Executed if the file is run directly using e.g. 'node convert.js'.
if (typeof require !== 'undefined' && require.main === module) {
    let filepath = process.argv[2];
    const data = fs.readFileSync(filepath, 'utf-8');
    const markdown = frontMatter(data);
    const rawHtml = marked.parse(markdown.body);
    console.log(convert(rawHtml));
}
