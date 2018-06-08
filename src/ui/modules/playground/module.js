import BaseComponent from '@src/ui/core/base-component';

import PlaygroundEditorComponent from '@src/ui/components/playground/editor';
import PlaygroundRendererComponent from '@src/ui/components/playground/renderer';

class PlaygroundModule extends BaseComponent {
  init() {
    this.$inputFields = this.$el.querySelectorAll('.js-variant-item');
    this.editorComponent = PlaygroundEditorComponent.initComponents('.c-editor', PlaygroundEditorComponent).components[0];
    this.rendererComponent = PlaygroundRendererComponent.initComponents('.c-renderer', PlaygroundRendererComponent).components[0];
    if (this.editorComponent && this.rendererComponent) {
      this.addEvents();
    }
  }

  destroy() {
    this.removeEvents();
  }

  addEvents() {
    this.$el.addEventListener('change', this.playgroundVariantsUpdated.bind(this));
    this.editorComponent.onChange(this.playgroundEditorUpdated.bind(this));
  }

  getActiveVariants() {
    return [].map.call(this.$inputFields, ($field) => {
      const {
        checked,
        dataset: {
          variantKey
        }
      } = $field;
      return (checked && variantKey !== '') ? variantKey : false;
    }).filter(activeVariantKey => activeVariantKey);
  }

  removeEvents() {
    this.editorComponent.$el.removeEventListener('change', this.playgroundEditorUpdated);
  }

  playgroundVariantsUpdated() {
    this.editorComponent.updateVariants(this.getActiveVariants());
  }

  playgroundEditorUpdated(data) {
    this.rendererComponent.updateContent(data);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  PlaygroundModule.initComponents('.m-playground', PlaygroundModule );
});

export default PlaygroundModule;
