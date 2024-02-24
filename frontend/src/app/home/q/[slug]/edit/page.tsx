'use client';

import { useEffect } from 'react';
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-preset-webpage';
import 'grapesjs/dist/css/grapes.min.css';

type Props = {};

const Page = (props: Props) => {
  useEffect(() => {
    grapesjs.init({
      container: '#gjs',
      height: '700px',
      width: '100%',
      plugins: [plugin],
      storageManager: {
        id: 'gjs-',
        type: 'local',
        autosave: true,
      },
      deviceManager: {
        devices: [
          {
            id: 'desktop',
            name: 'Desktop',
            width: '',
          },
          {
            id: 'tablet',
            name: 'Tablet',
            width: '768px',
            widthMedia: '992px',
          },
          {
            id: 'mobilePortrait',
            name: 'Mobile portrait',
            width: '320px',
            widthMedia: '575px',
          },
        ],
      },
      pluginsOpts: {
        'grapesjs-preset-webpage': {
          blocksBasicOpts: {
            blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image', 'video'],
            flexGrid: 1,
          },
          blocks: ['link-block', 'quote', 'text-basic'],
        },
      },
    });
  }, []);

  return <div id="gjs"></div>;
};

export default Page;
