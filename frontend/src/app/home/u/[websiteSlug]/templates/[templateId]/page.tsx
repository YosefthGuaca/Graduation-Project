type Props = { params: { websiteSlug: string; templateId: string } };

const Page = async (props: Props) => {
  const { websiteSlug, templateId } = props.params;
  let template = '';

  try {
    const response = await fetch('http://localhost:3000/defaultTemplate.html');
    template = await response.text();
  } catch (error) {
    console.log('Template fetch error: ', error);
  }

  return (
    <>
      <div id="gjs">
        <div dangerouslySetInnerHTML={{ __html: template }} />
      </div>
      <div id="websiteSlug" data-slug={websiteSlug} />
      <div id="pageSlug" data-slug="" />
    </>
  );
};

export default Page;
