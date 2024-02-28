import React from 'react';
import Script from 'next/script';
import grapesJsConfig from '@/utils/grapesjsInitial.js';
import grapesJsPanels from '@/utils/grapesjsPanels.js';
import grapesjsCommands from '@/utils/grapesjsCommands.js';
import 'grapesjs/dist/css/grapes.min.css';
import './grapesjs.css';

export default function EditLayout({ children }: { children: React.ReactNode }) {
  console.log('grapesJsConfig:', grapesJsConfig);
  console.log('grapesJsPanels:', grapesJsPanels);
  console.log('grapesjsCommands:', grapesjsCommands);
  return (
    <>
      <Script strategy="beforeInteractive" src="https://unpkg.com/grapesjs" />
      <section>{children}</section>
      <Script id="GrapesJS">
        {`
        const editor = grapesjs.init(${grapesJsConfig});
        ${grapesJsPanels.map((panel) => `editor.Panels.addPanel(${panel});`).join('\n')}
        ${grapesjsCommands.map((command) => `editor.Commands.add(${command[0]}, ${command[1]});`).join('\n')}
        `}
      </Script>
    </>
  );
}
