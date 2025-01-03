import './style.css'
import { setupCounter } from './counter.ts'
import { bookData, IBookNode } from './data.ts';

function renderBookNodeHTML(node: IBookNode): string {
  return `
    <div>
      <h1>${node.title}</h1>
      ${node.contents}
      ${node.children.map(renderBookNodeHTML).join('')}
    </div>
  `;
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = renderBookNodeHTML(bookData);

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
