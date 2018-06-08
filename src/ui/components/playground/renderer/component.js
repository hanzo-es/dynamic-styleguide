import BaseComponent from '@src/ui/core/base-component';

class PlaygroundRendererComponent extends BaseComponent {
  init() {
    this.$iframe = document.getElementById('styleguide-iframe-wrapper');
    this.$iframe.addEventListener('load', this.updateData.bind(this), false);
    this.updateData();
  }

  updateData() {
    this.innerDoc = this.$iframe.contentDocument || this.$iframe.contentWindow.document;
    this.$viewRendered = this.innerDoc.getElementById('viewer-rendered');
  }

  updateContent(newContent) {
    this.$viewRendered.innerHTML = newContent;
  }

  destroy() {
    this.removeEvents();
  }
}

export default PlaygroundRendererComponent;
