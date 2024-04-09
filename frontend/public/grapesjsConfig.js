const websiteSlug = document.getElementById('websiteSlug')?.getAttribute('data-slug');
const pageSlug = document.getElementById('pageSlug')?.getAttribute('data-slug');
const projectEndpoint = `http://localhost:4000/api/websites/${websiteSlug}/pages/${pageSlug || 'index'}`;
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');

const editor = grapesjs.init({
  fromElement: 1,
  container: '#gjs',
  plugins: [
    'grapesjs-preset-webpage',
    'gjs-blocks-basic',
    'grapesjs-plugin-forms',
    'grapesjs-component-countdown',
    'grapesjs-plugin-export',
    'grapesjs-custom-code',
    'grapesjs-touch',
    'grapesjs-parser-postcss',
    'grapesjs-tooltip',
    'grapesjs-tui-image-editor',
    'grapesjs-style-bg',
  ],
  assetManager: {},
  storageManager: {
    type: 'remote',
    stepsBeforeSave: 1,
  },
});

editor.Storage.add('remote', {
  async load() {
    try {
      const response = await fetch(projectEndpoint, {
        method: 'GET',
        headers: myHeaders,
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        return data.content || {};
      } else {
        console.error(`Error loading data: ${response.statusText}`);
        location.href = '/login';
        return null;
      }
    } catch (error) {
      console.error('Error loading data:', error);
      location.href = '/login';
      return null;
    }
  },

  async store(data) {
    try {
      const response = await fetch(projectEndpoint, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: myHeaders,
        credentials: 'include',
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Error storing data: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error storing data:', error);
      throw new Error(`Error storing data: ${error.message}`);
    }
  },
});

editor.Panels.addButton('options', [
  {
    id: 'publish',
    className: 'fa fa-upload',
    command: 'publish',
    attributes: { title: 'Publish' },
  },
]);

editor.Commands.add('publish', {
  async run(editor, sender) {
    sender && sender.set('active', 0);

    const html = editor.getHtml().replace(/(\r\n|\n|\r)/gm, '');
    const css = editor.getCss()?.replace(/(\r\n|\n|\r)/gm, '') || '';

    const result = await Swal.fire({
      title: 'Confirm!',
      text: 'Are you sure you want to publish?',
      icon: 'question',
      showCancelButton: true,
    });
    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:4000/u/${websiteSlug}/p/${pageSlug || 'index'}`, {
          method: 'POST',
          headers: myHeaders,
          credentials: 'include',
          body: JSON.stringify({ html: html, css: css }),
        });
        if (response.ok) {
          if (pageSlug && pageSlug !== 'index') {
            open(`http://localhost:4000/u/${websiteSlug}/p/${pageSlug}`);
          } else {
            open(`http://localhost:4000/u/${websiteSlug}`);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  },
});

editor.Commands.add('canvas-clear', {
  run(editor) {
    Swal.fire({
      title: 'Warning',
      text: 'Are you sure you want to delete all components?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        editor.DomComponents.clear();
        Swal.fire('Deleted!', 'Your component has been deleted.', 'success');
      }
    });
  },
});
