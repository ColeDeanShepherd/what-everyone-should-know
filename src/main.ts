import { bookData } from './data.ts';
import { renderBookNodeHTML } from './ui.ts';

function run() {
  const appContainer = document.querySelector<HTMLDivElement>('#app')!;
  appContainer.innerHTML = renderBookNodeHTML(bookData);
}

run();