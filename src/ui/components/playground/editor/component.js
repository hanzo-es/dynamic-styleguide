import BaseComponent from '@src/ui/core/base-component';
import CodeMirror from 'codemirror';

class CodeMirrorHelper {
  constructor(target) {
    this.$target = target;
    this.codeMirror = CodeMirror.fromTextArea(target, {
      mode: 'htmlmixed',
      lineNumbers: true,
      smartIndent: true,
      matchBrackets: true,
      tabSize: 2,
      theme: 'ttcn',
      readOnly: false,
    });
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
    this.$textArea = this.$el.querySelector('.textarea');
    this.originalValue = this.$textArea.defaultValue;
    this._replaceContent(PlaygroundEditorComponent.settings.VARIANT_REF, '');
    this.codeMirrorHelper = new CodeMirrorHelper(this.$textArea);
    this.updateEditor(this.$textArea.value);
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

