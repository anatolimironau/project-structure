import Sidebar from '../components/sidebar';

export default async function(path, match) {
  const main = document.querySelector('main');

  main.classList.add('is-loading');

  const { default: Page } = await import(/* webpackChunkName: "[request]" */`../pages/${path}/index.js`);
  const page = new Page(match[1]);
  const element = await page.render();

  main.classList.remove('is-loading');

  const contentNode = document.querySelector('#content');

  contentNode.innerHTML = '';
  contentNode.append(element);

  new Sidebar().setActiveItem(match[0]);

  return page;
}
