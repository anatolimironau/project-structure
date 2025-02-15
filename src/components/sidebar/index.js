class Sidebar {
  static _instance;

  onSidebarToggleClick = () => {
    const classList = document.body.classList;
    const collapsedSidebarClass = 'is-collapsed-sidebar';

    if (classList.contains(collapsedSidebarClass)) {
      classList.remove(collapsedSidebarClass);
    } else {
      classList.add(collapsedSidebarClass);
    }
  };

  constructor(itemsData = []) {
    if (Sidebar._instance) {
      return Sidebar._instance;
    }

    this.itemsData = itemsData;
    Sidebar._instance = this;
  }

  get template() {
    return `
      <aside class="sidebar">
        <h2 class="sidebar__title">
          <a href="/">shop admin</a>
        </h2>
        <ul class="sidebar__nav">${this.itemsTemplate}</ul>
        <ul class="sidebar__nav sidebar__nav_bottom">
          <li>
            <button type="button" class="sidebar__toggler">
              <i class="icon-toggle-sidebar"></i>
              <span>Скрыть панель</span>
            </button>
          </li>
        </ul>
      </aside>
    `;
  }

  get itemsTemplate() {
    return this.itemsData.map(({ id, href, name, isActive }) => `<li ${isActive ? `class="active"` : ''}><a href="${href}" data-page="${id}"><i class="icon-${id}"></i> <span>${name}</span></a></li>`).join('');
  }

  render() {
    this.element = this.getElementFromTemplate();
    this.initEventListeners();
    this.items = [...this.element.querySelectorAll('a[data-page]')];

    return this.element;
  }

  setActiveItem(href) {
    this.items.forEach(item => {
      const parent = item.closest('li');
      const hrefAttribute = item.getAttribute('href').substring(1);

      if ((hrefAttribute && href.includes(hrefAttribute)) || (!href && !hrefAttribute)) {
        parent.classList.add('active');
      } else {
        parent.removeAttribute('class');
      }
    });
  }

  getElementFromTemplate(template = this.template) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = template;

    return wrapper.firstElementChild;
  }

  initEventListeners() {
    this.element.querySelector('.sidebar__toggler').addEventListener('pointerdown', this.onSidebarToggleClick);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}

export default Sidebar;
