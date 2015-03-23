export function injectHTMLBlock(comment) {
  var md = comment.md;
  md = md.replace(/`{3}(html|block|\n)+[\s\S]*?`{3}/, (match) => {
    var block = match;
    block = block.replace(/`{3}(html|block|\n)+/, '')
      .replace(/`{3}/, '');
    return `${block}\n\n${match}`;
  });
  
  md = md.replace(/`{3}(js|javascript)+[\s\S]*?`{3}/, (match) => {
    var script = match;
    script = script.replace(/`{3}(js|javascript)+/, '')
      .replace(/`{3}/, '');
    return `${match}\n\n<script>${script}</script>`;
  });
  
  comment.md = md;
  return comment;
}
