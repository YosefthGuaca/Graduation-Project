import Script from 'next/script';
import 'grapesjs/dist/css/grapes.min.css';

type Props = { params: { websiteSlug: string; pageSlug: string } };

// This is editing the page for *.html.
const Page = (props: Props) => {
  const { websiteSlug, pageSlug } = props.params;

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
      <div id="gjs" />
      <div id="websiteSlug" data-slug={websiteSlug} />
      <div id="pageSlug" data-slug={pageSlug} />
      <Script id="GrapsJS" src="/grapesjsConfig.js" />
    </>
  );
};

export default Page;
