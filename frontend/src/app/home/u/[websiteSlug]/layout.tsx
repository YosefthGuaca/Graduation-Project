import React from 'react';
import Script from 'next/script';
import 'grapesjs/dist/css/grapes.min.css';

export default function EditLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script strategy="beforeInteractive" src="https://unpkg.com/grapesjs" />
      <Script strategy="beforeInteractive" src="https://unpkg.com/grapesjs-preset-webpage@1.0.2" />
      <Script strategy="beforeInteractive" src="https://unpkg.com/grapesjs-blocks-basic@1.0.1" />
      <Script strategy="beforeInteractive" src="https://unpkg.com/grapesjs-plugin-forms" />
      <Script strategy="beforeInteractive" src="https://unpkg.com/grapesjs-component-countdown" />
      <Script strategy="beforeInteractive" src="https://unpkg.com/grapesjs-plugin-export" />
      <Script strategy="beforeInteractive" src="https://unpkg.com/grapesjs-custom-code" />
      <Script strategy="beforeInteractive" src="https://unpkg.com/grapesjs-touch" />
      <Script strategy="beforeInteractive" src="https://unpkg.com/grapesjs-parser-postcss" />
      <Script strategy="beforeInteractive" src="https://unpkg.com/grapesjs-tooltip" />
      <Script strategy="beforeInteractive" src="https://unpkg.com/grapesjs-tui-image-editor" />
      <Script strategy="beforeInteractive" src="https://unpkg.com/grapesjs-style-bg" />
      <section>{children}</section>
      <Script id="GrapesJS" src="/grapesjsConfig.js" />
    </>
  );
}
