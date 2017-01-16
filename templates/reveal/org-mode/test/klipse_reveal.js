{

const config = Reveal.getConfig().klipse || {};

const langToSelectorName = {
  clojure: 'selector',
  javascript: 'selector_eval_js',
  python: 'selector_eval_python_client',
  scheme: 'selector_eval_scheme',
  ruby: 'selector_eval_ruby',
};

let jsSrc = (lang) => {
    if (lang === 'clojure') {
        return 'https://storage.googleapis.com/app.klipse.tech/plugin/js/klipse_plugin.js'
    }
    return 'https://storage.googleapis.com/app.klipse.tech/plugin_prod/js/klipse_plugin.min.js'
}

let escapeHtml = (unsafe) => {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 };

let createIFrame = (lang, elemHTML) => {
    return `<iframe height="500px" width="100%" srcdoc='
      ${elemHTML}
      <link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;https://storage.googleapis.com/app.klipse.tech/css/codemirror.css&quot;>

      <script>
     // window.eval = parent.eval;
      window.klipse_settings = {
          &quot;selector&quot;: &quot;.src-klipse-clojure&quot;,
          &quot;selector_eval_js&quot;: &quot;.src-klipse-javascript&quot;,
          &quot;selector_eval_python_client&quot;: &quot;.src-klipse-python&quot;,
          &quot;selector_eval_scheme&quot;: &quot;.src-klipse-scheme&quot;,
         &quot;selector_eval_ruby&quot;: &quot;.src-klipse-ruby&quot;,
      };
      </script>
      <script src=&quot;${jsSrc(lang)}&quot;></script>
    '>
    </iframe>`
};

    let language = (elem) => {
        const classes = elem.classList;
        var res = "";
        ['clojure', 'javascript', 'ruby', 'python', 'scheme'].forEach((lang) => {
            if (classes.contains("src-klipse-" + lang)) {
                res = lang;
            }
        });
        return res;
    }
    let klipsify = (elem) => {

        elem.innerHTML = createIFrame(language(elem), escapeHtml(elem.outerHTML));
        return elem;
    }

    document.querySelectorAll('.src-klipse-clojure, .src-klipse-javascript, .src-klipse-ruby, .src-klipse-python, .src-klipse-scheme').forEach(x => klipsify(x))
}
