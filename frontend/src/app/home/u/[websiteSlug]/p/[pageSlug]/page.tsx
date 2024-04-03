type Props = { params: { websiteSlug: string; pageSlug: string } };

// This is editing the page for *.html.
const Page = (props: Props) => {
  const { websiteSlug, pageSlug } = props.params;

  return (
    <>
      <div id="gjs" />
      <div id="websiteSlug" data-slug={websiteSlug} />
      <div id="pageSlug" data-slug={pageSlug} />
    </>
  );
};

export default Page;
