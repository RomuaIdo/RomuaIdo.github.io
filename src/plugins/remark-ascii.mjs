import { visit } from 'unist-util-visit';

// Turns ```ascii fenced blocks into <figure class="ascii"><pre>...</pre></figure>,
// skipping syntax highlighting. Optional caption: ```ascii title="Caption".
export default function remarkAscii() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'ascii' || !parent || index === undefined) return;
      const caption = /title="([^"]*)"/.exec(node.meta ?? '')?.[1];
      const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const html =
        `<figure class="ascii"><pre role="img" aria-label="${esc(caption ?? 'Diagram')}">` +
        `${esc(node.value)}</pre>` +
        (caption ? `<figcaption>${esc(caption)}</figcaption>` : '') +
        `</figure>`;
      parent.children[index] = { type: 'html', value: html };
    });
  };
}
