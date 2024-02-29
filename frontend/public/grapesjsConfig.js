const projectID = 1;
const projectEndpoint = `http://localhost:4000/projects/${projectID}`;
const editor = grapesjs.init({
  container: '#gjs',
  plugins: ['grapesjs-preset-webpage'],
  storageManager: {
    type: 'remote',
    stepsBeforeSave: 3,
    options: {
      remote: {
        urlLoad: projectEndpoint,
        urlStore: projectEndpoint,
        // The `remote` storage uses the POST method when stores data but
        // the json-server API requires PATCH.
        fetchOptions: (opts) => (opts.method === 'POST' ? { method: 'PATCH' } : {}),
        // As the API stores projects in this format `{id: 1, data: projectData }`,
        // we have to properly update the body before the store and extract the
        // project data from the response result.
        onStore: (data) => ({ id: projectID, data }),
        onLoad: (result) => result.data,
      },
    },
  },
});
