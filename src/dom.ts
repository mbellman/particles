interface Query {
  append: (html: string) => Query;
  html: (html: string) => Query;
  on: (eventName: string, handler: (e: Event) => any) => Query;
};

interface TemplateOptions {
  html: string;
  css?: string;
  init?: () => void;
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

export function q(selector: string): Query {
  const elements: Element[] = [].slice.call(document.querySelectorAll(selector), 0);

  return {
    append(html) {
      elements.forEach(element => {
        const child = document.createElement('div');

        child.innerHTML = html;

        const nodes = [].slice.call(child.childNodes, 0);

        nodes.forEach(node => element.appendChild(node));
      });

      return this;
    },
    html(html) {
      elements.forEach(element => element.innerHTML = html);

      return this;
    },
    on(eventName, handler) {
      elements.forEach(element => element.addEventListener(eventName, handler));

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

      q(target).append(html);

      if (init) {
        init();
      }
    }
  };
}