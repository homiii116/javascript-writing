const fs = require('fs');
const path = require('path');
const watch = require('watch');
const { marked } = require('marked');
const frontMatter = require('front-matter');
const liveServer = require("live-server");
const convert = require('./convert');

function markdownChanged(file) {
    const rawMarkdown = fs.readFileSync(file, 'utf-8');
    const template = fs.readFileSync('preview-template.html', 'utf-8');

    const markdown = frontMatter(rawMarkdown);
    const rawPostHtml = marked.parse(markdown.body);
    const postHtml = convert(rawPostHtml);
    let previewHtml = template.replace("{{POST_CONTENT}}", postHtml);
    
    // Replace template with front matter attributes.
    const params = markdown.attributes;
    for (const name in params) {
        previewHtml = previewHtml.replaceAll(`{{PARAM:${name}}}`, String(params[name]));
    }

    const filename = path.basename(file, '.md') + '.preview.html';
    fs.writeFileSync(path.join(path.dirname(file), filename), previewHtml);
}

let watchOpts = {
    interval: 0.1,
};
let liveServerOpts = {
    port: 8105, // Set the server port. Defaults to 8080.
    open: true, // When false, it won't load your browser by default.
    wait: 100, // Waits for all changes, before reloading. Defaults to 0 sec.
    root: './articles', // Set root directory that's being served. Defaults to cwd.
}
watch.createMonitor('.', watchOpts, function (monitor) {
    monitor.on("created", function (f) {
        if (path.extname(f) === '.md') {
            markdownChanged(f);
        }
    });
    monitor.on("changed", function (f) {
        if (path.extname(f) === '.md') {
            markdownChanged(f);
        }
    });
    liveServer.start(liveServerOpts);
})