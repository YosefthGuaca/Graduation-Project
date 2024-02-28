const grapesJsCommands = {
  'show-layers': {
    getRowEl(editor) {
      return editor.getContainer().closest('.editor-row');
    },
    getLayersEl(row) {
      return row.querySelector('.layers-container');
    },

    run(editor, sender) {
      const lmEl = this.getLayersEl(this.getRowEl(editor));
      lmEl.style.display = '';
    },
    stop(editor, sender) {
      const lmEl = this.getLayersEl(this.getRowEl(editor));
      lmEl.style.display = 'none';
    },
  },
  'show-styles': {
    getRowEl(editor) {
      return editor.getContainer().closest('.editor-row');
    },
    getStyleEl(row) {
      return row.querySelector('.styles-container');
    },

    run(editor, sender) {
      const smEl = this.getStyleEl(this.getRowEl(editor));
      smEl.style.display = '';
    },
    stop(editor, sender) {
      const smEl = this.getStyleEl(this.getRowEl(editor));
      smEl.style.display = 'none';
    },
  },
};

function stringifyWithFunctions(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'function') {
      return value.toString();
    }
    return value;
  });
}

const output = Object.entries(grapesJsCommands).map(([k, v]) => [k, stringifyWithFunctions(v)]);

export default output;
