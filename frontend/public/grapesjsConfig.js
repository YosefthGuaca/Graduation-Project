const websiteSlug = document.getElementById('websiteSlug')?.getAttribute('data-slug');
const pageSlug = document.getElementById('pageSlug')?.getAttribute('data-slug');
const projectEndpoint = `http://localhost:4000/api/websites/${websiteSlug}/pages/${pageSlug || 'index'}`;
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');
let projectData = {};

const getProjectData = async () => {
  try {
    const res = await fetch(projectEndpoint, {
      credentials: 'include',
    });
    const data = await res.json();
    if (!data) {
      window.location.href = '/home';
    }
    projectData = data.content;
    initEditor();
  } catch (error) {
    window.location.href = '/home';
    console.error(error);
  }
};

const initEditor = () => {
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
    projectData: projectData,
    assetManager: {},
    storageManager: {
      type: 'remote',
      stepsBeforeSave: 1,
      // options: {
      //   remote: {
      //     urlLoad: projectEndpoint,
      //     urlStore: projectEndpoint,
      //     fetchOptions: (opts) => (opts.method === 'POST' ? { method: 'PATCH' } : {}),
      //     onStore: (data) => ({ id: projectID, data }),
      //     onLoad: (result) => result.data,
      //   },
      // },
    },
  });

  editor.Storage.add('remote', {
    // async load() {
    //   try {
    //     const response = await fetch(projectEndpoint);
    //     if (response.ok) {
    //       const data = await response.json();
    //       console.log(data);
    //       return data;
    //     } else {
    //       console.error(`Error loading data: ${response.statusText}`);
    //       return null;
    //     }
    //   } catch (error) {
    //     console.error('Error loading data:', error);
    //     return null;
    //   }
    // },

    async store(data) {
      try {
        const response = await fetch(projectEndpoint, {
          mode: 'cors',
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
};

getProjectData();
