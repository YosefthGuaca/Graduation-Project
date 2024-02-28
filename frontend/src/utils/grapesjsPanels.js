const grapesJsPanels = [
  {
    id: 'panel-top',
    el: '.panel__top',
  },
  {
    id: 'basic-actions',
    el: '.panel__basic-actions',
    buttons: [
      {
        id: 'visibility',
        active: true, // active by default
        className: 'btn-toggle-borders',
        label: '<u>B</u>',
        command: 'sw-visibility', // Built-in command
      },
      {
        id: 'export',
        className: 'btn-open-export',
        label: 'Exp',
        command: 'export-template',
        context: 'export-template', // For grouping context of buttons from the same panel
      },
      {
        id: 'show-json',
        className: 'btn-show-json',
        label: 'JSON',
        context: 'show-json',
        command(editor) {
          editor.Modal.setTitle('Components JSON')
            .setContent(
              `<textarea style="width:100%; height: 250px;">
              ${JSON.stringify(editor.getComponents())}
            </textarea>`,
            )
            .open();
        },
      },
    ],
  },
];

function stringifyWithFunctions(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'function') {
      return value.toString();
    }
    return value;
  });
}

const output = grapesJsPanels.map((panel) => stringifyWithFunctions(panel));

export default output;
