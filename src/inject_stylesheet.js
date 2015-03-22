export function injectStyleSheet(html) {
  return `<link rel="stylesheet" href="./node_modules/highlight.js/styles/github.css" media="screen" title="no title" charset="utf-8">
    <script src="./node_modules/jquery/dist/jquery.js"></script>
    ${html}`;
}
