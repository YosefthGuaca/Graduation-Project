import React from 'react';
import Script from 'next/script';
import 'grapesjs/dist/css/grapes.min.css';
import './grapesjs.css';

export default function EditLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script strategy="beforeInteractive" src="https://unpkg.com/grapesjs" />
      <section>{children}</section>
      <Script id="GrapesJS" src="/grapesjsConfig.js" />
    </>
  );
}
