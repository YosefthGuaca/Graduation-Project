const projectID = 1;
const projectEndpoint = `http://localhost:4000/projects/${projectID}`;
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');
let projectData = {};

const getProjectData = async () => {
  try {
    const res = await fetch(projectEndpoint);
    const data = await res.json();
    projectData = data.content;
    initEditor();
  } catch (error) {
    console.error(error);
  }
};

const initEditor = () => {
  const editor = grapesjs.init({
    container: '#gjs',
    plugins: ['grapesjs-preset-webpage'],
    projectData: projectData,
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
