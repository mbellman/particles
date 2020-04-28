interface Query {
  __elements: Element[];
  append: (html: string | Query) => Query;
  find: (selector: string) => Query;
  html: (html: string) => Query;
  on: (eventName: string, handler: (e: Event) => any) => Query;
};

interface TemplateOptions {
  html: string;
  css?: string;
  init?: (query: Query) => void;
};

interface Template {
  __hasBeenPlaced: boolean;
  place(target: string): void;
};

function applyCss(css: string) {
  const tag = document.createElement('style');

  tag.type = 'text/css';
  tag.innerHTML = css;

  document.head.appendChild(tag);
}

function createNodes(html: string): Element[] {
  const child = document.createElement('div');

  child.innerHTML = html;

  return [].slice.call(child.childNodes, 0);
}

export function q(selector: string): Query;
export function q(elements: Element[]): Query;
export function q(selector: string | Element[]): Query {
  let elements: Element[];

  if (typeof selector === 'string') {
    elements = [].slice.call(document.querySelectorAll(selector as string), 0);
  } else {
    elements = selector;
  }

  return {
    __elements: elements,
    append(html: string | Query) {
      elements.forEach(element => {
        if (typeof html === 'string') {
          createNodes(html).forEach(node => element.appendChild(node));
        } else {
          html.__elements.forEach(node => element.appendChild(node));
        }
      });

      return this;
    },
    find(selector: string) {
      let found: Element[] = [];

      elements
        .filter(element => !!element.querySelectorAll)
        .forEach(element => {
          found = found.concat([].slice.call(element.querySelectorAll(selector), 0));
        });

      return q(found);
    },
    html(html: string) {
      elements.forEach(element => element.innerHTML = html);

      return this;
    },
    on(eventName: string, handler: (e: Event) => any) {
      elements
        .filter(element => !!element.addEventListener)
        .forEach(element => element.addEventListener(eventName, handler));

      return this;
    }
  };
}

export function createTemplate({ html, css, init }: TemplateOptions): Template {
  return {
    __hasBeenPlaced: false,
    place(target: string) {
      if (!this.__hasBeenPlaced) {
        applyCss(css);

        this.__hasBeenPlaced = true;
      }

      const nodes = createNodes(html);
      const $root = q(nodes);

      q(target).append($root);

      if (init) {
        init($root);
      }
    }
  };
}