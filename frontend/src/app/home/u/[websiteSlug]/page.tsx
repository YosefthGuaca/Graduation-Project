import Script from 'next/script';
import 'grapesjs/dist/css/grapes.min.css';
import TemplateLinkModal from '@/app/components/TemplateLinkModal';

type Props = { params: { websiteSlug: string } };

// This is editing the page for index.html.
const Page = (props: Props) => {
  const { websiteSlug } = props.params;

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
      <Script id="SweetAlert" src="https://cdn.jsdelivr.net/npm/sweetalert2@11" />
      <div id="gjs" />
      <div id="websiteSlug" data-slug={websiteSlug} />
      <div id="pageSlug" data-slug="" />
      <Script id="GrapsJS" src="/grapesjsConfig.js" />
      <TemplateLinkModal websiteSlug={websiteSlug} pageSlug="index" />
    </>
  );
};

export default Page;
