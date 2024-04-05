import SelectTemplateModal from '@/app/components/SelectTemplateModal';

type Props = { params: { websiteSlug: string } };

// This is editing the page for index.html.
const Page = (props: Props) => {
  const { websiteSlug } = props.params;

  return (
    <>
      <div id="gjs" />
      <div id="websiteSlug" data-slug={websiteSlug} />
      <div id="pageSlug" data-slug="" />
      <SelectTemplateModal websiteSlug={websiteSlug} pageSlug="index" />
    </>
  );
};

export default Page;
