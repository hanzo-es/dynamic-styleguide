import BaseComponent from '@src/ui/core/base-component';

class PlaygroundRendererComponent extends BaseComponent {
  init() {
    this.$iframe = document.getElementById('styleguide-iframe-wrapper');
    this.$iframe.addEventListener('load', this.updateData.bind(this), false);
    this.updateData();

    this.$link = document.getElementById('open-in-new-window');
    this.$link.addEventListener('click', this.openNewWindow.bind(this), false);
  }

  updateData() {
    this.innerDoc = this.$iframe.contentDocument || this.$iframe.contentWindow.document;
    this.$viewRendered = this.innerDoc.getElementById('viewer-rendered');
  }

  updateContent(newContent) {
    this.$viewRendered.innerHTML = newContent;
  }

  openNewWindow() {
    const { dataset, target } = this.$link;
    const variants = encodeURI(JSON.stringify(this.variants || []));
    const url = `${dataset.originalUrl}?variants=${variants}`;
    window.open(url, target || '_blank');
  }

  updateVariants(variants) {
    this.variants = variants;
  }

  destroy() {
    this.removeEvents();
  }
}

export default PlaygroundRendererComponent;
