const fs = require('fs');
const path = require('path');
const watch = require('watch');
const { marked } = require('marked');
const liveServer = require("live-server");
const convert = require('./convert');

function markdownChanged(file) {
    const markdown = fs.readFileSync(file, 'utf-8');
    const template = fs.readFileSync('preview-template.html', 'utf-8');

    const rawPostHtml = marked.parse(markdown);
    const postHtml = convert(rawPostHtml);
    const previewHtml = template.replace("{{POST_CONTENT}}", postHtml);

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
    console.log("DONE!");
})