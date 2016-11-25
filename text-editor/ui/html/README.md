HTML › UI › Text Editor
=======================

> HTML text editor plugin.

[View Demo](https://rawgit.com/tovic/text-editor/master/text-editor/ui/html/html.html)

### CSS

~~~ .html
<link href="../font-awesome.min.css" rel="stylesheet">
<link href="../text-editor/ui/ui.min.css" rel="stylesheet">
<link href="../text-editor/ui/ui/ui.white.min.css" rel="stylesheet">
<style>
.text-editor-content {height:300px} /* adjust editor height */
</style>
~~~

### JavaScript

~~~ .html
<script src="../text-editor.min.js"></script>
<script src="../text-editor/ui/ui.min.js"></script>
<script src="../text-editor/ui/html/html.min.js"></script>
~~~

Instance
--------

~~~ .javascript
var config = {
    suffix: '>', // replace with `/>` to output `<br/>` instead of `<br>`
    auto_encode_html: true, // auto encode HTML tag(s) in `<code>` tag
    auto_p: true, // smart paragraph insertion
    tools: 'clear | b i u s | sub sup | a img | p,h1,h2,h3,h4,h5,h6 | blockquote,q pre,code | ul ol | indent outdent | table | hr | undo redo',
    states: {
        tr: [1, 20], // minimum and maximum table row(s)
        td: [1, 20], // minimum and maximum table column(s)
        abbr: {}
    },
    advance_a: true, // detect external URL and automatically adds `rel="nofollow" target="_blank"` attributes to the link markup
    advance_img: true, // insert image with a `<figure>` element if title field is defined
    advance_table: true, // include `<thead>`, `<tbody>` and `<tfoot>` markup
    formats: {
        b: 'strong',
        i: 'em',
        u: 'u',
        s: 'del datetime="%1-%2-%3"',
        a: 'a',
        figure: 'figure',
        figcaption: 'figcaption',
        img: 'img',
        sub: 'sub',
        sup: 'sup',
        abbr: 'abbr',
        p: 'p',
        br: 'br',
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        blockquote: 'blockquote',
        q: 'q',
        pre: 'pre',
        code: 'code',
        ul: 'ul',
        ol: 'ol',
        li: 'li',
        table: 'table border="1"',
        caption: 'caption',
        thead: 'thead',
        tbody: 'tbody',
        tfoot: 'tfoot',
        tr: 'tr',
        th: 'th',
        td: 'td',
        hr: 'hr'
    }
};

var editor = TE.ui.HTML(document.querySelector('textarea'), config);
~~~

Methods
-------

### Trigger Editor Tools

This is the same as when you click the bold button:

~~~ .javascript
editor.ui.tools.b.click(null, editor);
~~~

Trigger editor tool with data from a modal prompt:

~~~ .javascript
function do_modals(id, data, $) {
    // [1]. trigger the tool item to show the modal prompt
    $.ui.tools[id].click(null, $);
    // [2]. access the visible modal prompt HTML through `$.ui.el.modal`
    var $modal = $.ui.el.modal, i, j, k;
    for (i in data) {
        if (j = $modal.querySelector('[name=data]')) {
            // [3]. set value to the prompt field
            j.value = data[i];
            // [4]. trigger click event to the submit button
            if (k = $modal.querySelector('[name=y]')) {
                $._.event.fire("click", k);
            }
        }
    }
    return $;
}
~~~

Usage:

~~~ .javascript
// insert table with `4` columns, `6` rows and a `Lorem Ipsum` caption
do_modals('table', [4, 6, 'Lorem Ipsum'], editor);

// insert link to `http://example.com` with `Lorem Ipsum` title
do_modals('a', ['http://example.com', 'Lorem Ipsum'], editor);
~~~

Hooks
-----

 - `enter.modal.prompt:a[href]`
 - `enter.modal.prompt:a[title]`
 - `exit.modal.prompt:a[href].y`
 - `exit.modal.prompt:a[title].y`
 - `exit.modal.prompt:a[href].n`
 - `exit.modal.prompt:a[title].n`
 - `enter.modal.prompt:img[src]`
 - `enter.modal.prompt:img[title]`
 - `exit.modal.prompt:img[src].y`
 - `exit.modal.prompt:img[title].y`
 - `exit.modal.prompt:img[src].n`
 - `exit.modal.prompt:img[title].n`
 - `enter.modal.prompt:table>td`
 - `enter.modal.prompt:table>tr`
 - `enter.modal.prompt:table>caption`
 - `exit.modal.prompt:table>td.y`
 - `exit.modal.prompt:table>tr.y`
 - `exit.modal.prompt:table>caption.y`
 - `exit.modal.prompt:table>td.n`
 - `exit.modal.prompt:table>tr.n`
 - `exit.modal.prompt:table>caption.n`