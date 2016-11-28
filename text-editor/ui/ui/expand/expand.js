/*!
 * ==========================================================
 *  EXPAND PLUGIN FOR USER INTERFACE MODULE 1.0.11
 * ==========================================================
 * Author: Taufik Nurrohman <https://github.com/tovic>
 * License: MIT
 * ----------------------------------------------------------
 */

TE.each(function($) {

    var uniq = '-' + Date.now(),
        doc = document,
        html = doc.documentElement,
        head = doc.head,
        body = doc.body,

        ui = $.ui,
        target = $.target,
        container = ui.el.container,

        _ = $._,
        _dom = _.dom,
        _dom_class_set = _dom.classes.set,
        _dom_class_reset = _dom.classes.reset,
        _dom_prepend = _dom.prepend,
        _el = _.el,
        _extend = _.extend,

        expand = 'expand',
        min = 'minimize',
        max = 'maximize',

        config = $.config,
        i18n = config.languages.tools,
        s = config.classes[""],
        prefix = '.' + s,
        suffix = '-is-' + expand + 'ed',
        prefix_base = prefix + suffix + prefix + uniq + suffix,

        $$ = $.target.style, is_max;

    prefix = prefix_base + ' ' + prefix + '-' + expand + uniq + ' ' + prefix;

    _dom_class_set(container, s + '-' + expand + uniq + ' ' + s + '-is-can-expand');

    _extend(i18n, {
        maximize: ['Maximize', 'F11'],
        minimize: ['Minimize', 'F11']
    });

    _dom_prepend(head, _el('style', prefix + '-description .left,' + prefix + '-footer+.' + s + '-resize{display:none}' + prefix_base + ',' + prefix_base + ' body{position:static;overflow:hidden}' + prefix_base + ' .' + s + '-expand' + uniq + '{border-width:0;position:fixed;top:0;right:0;bottom:0;left:0;margin:0;padding:0;z-index:9998;width:100%;height:100%}' + prefix + '-body,' + prefix + '-content{border-width:0;width:100%;height:100%;position:absolute;top:0;right:0;bottom:0;left:0}' + prefix + '-content{font-size:1.5em;padding:2.5em 1em 1em;resize:none}' + prefix + '-footer,' + prefix + '-header{position:absolute;top:0;left:0;margin:.5em;z-index:9999;background:inherit;border:1px solid;border-color:inherit;box-shadow:0 0 2px rgba(0,0,0,.2)}' + prefix + '-footer{position:absolute;top:auto;bottom:0;left:0}' + prefix + '-description{padding:.4em .8em}', {
        'id': s + '-style:' + expand + uniq
    }));

    function do_max(e) {
        is_max = 1;
        i18n[expand] = i18n[min];
        _dom_class_set(html, s + suffix + ' ' + s + uniq + suffix);
        _dom_class_reset(container, s + '-is-can-resize');
        ui.tool(expand, {
            i: 'compress',
            click: do_min
        }).select();
        $$.height = $$.width = $$.minHeight = $$.minWidth = "";
        return false;
    }

    function do_min(e) {
        is_max = 0;
        i18n[expand] = i18n[max];
        _dom_class_reset(html, s + suffix + ' ' + s + uniq + suffix);
        _dom_class_set(container, s + '-is-can-resize');
        ui.tool(expand, {
            i: 'expand',
            click: do_max
        });
        if (e) $.select();
        return false;
    } do_min();

    // press `f11` to maximize/minimize
    ui.key('f11', function(e, $) {
        return is_max ? do_min(e) : do_max(e), false;
    });

});