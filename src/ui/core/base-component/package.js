class InternalComponentClassMapper {
  static mapClass(queriedComponents, ClassDef) {
    const result = {
      components: [],
      elements: [],
    };
    result.elements = [].map.call(document.querySelectorAll(queriedComponents), (container) => {
      if (!container.hasAttribute('data-initialized')) {
        result.components.push(new ClassDef(container));
      }

      return container;
    });

    return result;
  }
}

class BaseComponent {
  constructor($el) {
    this.$el = $el;
    this.init();
  }

  init() {
    this.$el.setAttribute('data-initialized', true);
  }

  static initComponents(querySelector, ClassDef) {
    return InternalComponentClassMapper.mapClass(querySelector, ClassDef);
  }
}


export default BaseComponent;
