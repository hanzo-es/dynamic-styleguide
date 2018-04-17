const VARIANT_REF = '{{variant}}';

document.addEventListener("DOMContentLoaded", function() {
  const iframe = document.getElementById('styleguide-iframe-wrapper');
  const textarea = document.getElementById('styleguide-textarea-example');
  let myCodeMirror;
  let originalContent;

  // Render the component editor and update it rendered
  if (!!iframe && !!textarea){
    originalContent = textarea.value;
    textarea.value = textarea.value.replace(VARIANT_REF, '');
    iframe.onload = () => {
      myCodeMirror = CodeMirror.fromTextArea(textarea, {
        mode: 'htmlmixed',
        lineNumbers: true,
        smartIndent: true,
        tabSize: 2,
        matchBrackets: true,
        theme: 'tomorrow-night-bright',
        readOnly: false,
      });
      const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      myCodeMirror.on('change', (instance) => {
        const htmlString = instance.getValue();
        const viewerRendered = innerDoc.getElementById('viewer-rendered')
        viewerRendered.innerHTML = htmlString;
      });
      indentEditor(myCodeMirror);
    }
  };

  // Listen to Variant changes
  const variantsWrapper = document.getElementById('styleguide-variants-wrapper');
  if(variantsWrapper){
    variantsWrapper.addEventListener('change', ({target}) => {
      const inputs = document.getElementsByClassName('styleguide-variant-elements');
      const variantClassnames = [];
      for (let i = 0; i < inputs.length; i++) {
        const {checked, dataset:{variantKey}} = inputs[i];
        if (checked && variantKey !== '') {
          variantClassnames.push(variantKey);
        }
      }
      myCodeMirror.setValue(originalContent.replace(VARIANT_REF, variantClassnames.join(' ')));
      indentEditor(myCodeMirror);
    })
  }
})

function indentEditor (editorInstance) {
  // fix indentation issues forcing a smart indent
  // https://discuss.codemirror.net/t/auto-indent-on-load-taxtarea-change/1174/4
  // select all content
  editorInstance.setSelection({
    'line':editorInstance.firstLine(),
    'ch':0,
    'sticky':null
  },{
    'line':editorInstance.lastLine(),
    'ch':0,
    'sticky':null
  },
  {scroll: false});
  // fix indentation
  editorInstance.indentSelection("smart");
  // unselect again
  editorInstance.setSelection({
    'line':editorInstance.firstLine(),
    'ch':0,
    'sticky':null
  });
}
