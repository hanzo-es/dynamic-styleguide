import BaseComponent from '@src/ui/core/base-component';

const CONTENT_VAR_TO_REPLACE = '{{content}}';

class IconsTableComponent extends BaseComponent {
  init() {
    this.$inputFields = this.$el.querySelectorAll('.icon-radio');
    this.addEvents();
    this.template = window.DynamicStyleGuide.iconContainerTemplate || `<div>${CONTENT_VAR_TO_REPLACE}</div>`;
  }

  destroy() {
    this.removeEvents();
  }

  addEvents() {
    this.$el.addEventListener('change', this.playgroundUpdateContent.bind(this));
  }

  removeEvents() {
    this.$el.removeEventListener('change', this.playgroundUpdateContent);
  }

  getSelectedContent() {
    const checked = [...this.$inputFields].filter($field => $field.checked);
    if (checked.length > 0) {
      return checked[0].parentElement.querySelector('.icon-code').innerHTML;
    }
    return null;
  }

  playgroundUpdateContent(e) {
    const content = this.getSelectedContent();
    if (content) {
      const editorContent = this.template.replace(CONTENT_VAR_TO_REPLACE, content);
      this.emitter.emit('playgroundUpdateContent', e, editorContent);
    }
    e.stopPropagation();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  IconsTableComponent.initComponents('#iconsTableContainer', IconsTableComponent);
});

export default IconsTableComponent;
