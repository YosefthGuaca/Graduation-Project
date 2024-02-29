import React from 'react';
import Script from 'next/script';
import 'grapesjs/dist/css/grapes.min.css';

export default function EditLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script strategy="beforeInteractive" src="https://unpkg.com/grapesjs" />
      <Script strategy="beforeInteractive" src="https://unpkg.com/grapesjs-preset-webpage" />
      <section>{children}</section>
      <Script id="GrapesJS" src="/grapesjsConfig.js" />
    </>
  );
}
