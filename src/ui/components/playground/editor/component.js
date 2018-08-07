import BaseComponent from '@src/ui/core/base-component';
import CodeMirror from 'codemirror';

class CodeMirrorHelper {
  constructor(target, options) {
    const defaultOptions = {
      mode: 'htmlmixed',
      lineNumbers: true,
      smartIndent: true,
      matchBrackets: true,
      tabSize: 2,
      theme: 'ttcn',
      readOnly: false,
    };
    this.$target = target;
    this.codeMirror = CodeMirror.fromTextArea(target, Object.assign({}, defaultOptions, options));
  }

  update(newVal) {
    this.codeMirror.setValue(newVal);
    this._codeMirrorIndentation();
  }

  _codeMirrorIndentation() {
    // fix indentation issues forcing a smart indent
    // https://discuss.codemirror.net/t/auto-indent-on-load-taxtarea-change/1174/4
    // select all content
    this.codeMirror.setSelection({
      'line': this.codeMirror.firstLine(),
      'ch': 0,
      'sticky': null
    }, {
      'line': this.codeMirror.lastLine(),
      'ch': 0,
      'sticky': null
    }, {
      scroll: false
    });
    this.codeMirror.indentSelection('smart');
    // unselect again
    this.codeMirror.setSelection({
      'line': this.codeMirror.firstLine(),
      'ch': 0,
      'sticky': null
    });
  }
}

class PlaygroundEditorComponent extends BaseComponent {
  init() {
    // Init the editable example. One and only one is expected
    this.$textArea = this.$el.querySelector('.codemirror-textarea-editable');
    this.originalValue = this.$textArea.defaultValue;
    this._replaceContent(PlaygroundEditorComponent.settings.VARIANT_REF, '');
    this.codeMirrorHelper = new CodeMirrorHelper(this.$textArea);
    this.updateEditor(this.$textArea.value);

    // Init the others files
    const readOnlyTexareas = this.$el.querySelectorAll('.codemirror-textarea-readonly');
    readOnlyTexareas.forEach(element => {
      const mode = element.dataset.mode;
      const cm = new CodeMirrorHelper(element,{mode, readOnly: true}); //eslint-disable-line
      cm.update(element.value);
    });
  }

  onChange(callback) {
    CodeMirror.on(this.codeMirrorHelper.codeMirror, 'change', (e) => {
      callback(e.getValue());
    });
  }

  updateEditor(newVal) {
    this.codeMirrorHelper.update(newVal);
  }

  updateVariants(variantClassNames) {
    this._replaceContent(
      PlaygroundEditorComponent.settings.VARIANT_REF,
      variantClassNames.join(' ')
    );
    this.updateEditor(this.$textArea.value);
  }

  _replaceContent(ref, content) {
    this.$textArea.value = this.originalValue.replace(ref, content);
  }
}

/** PlaygroundEditorComponent static Settings **/
PlaygroundEditorComponent.settings = {
  VARIANT_REF: '{{variant}}'
};

export default PlaygroundEditorComponent;

