import TemplateList from '@/app/components/TemplateList';

type Props = { params: { websiteSlug: string } };

const Page = async (props: Props) => {
  const { websiteSlug } = props.params;

  return <TemplateList websiteSlug={websiteSlug} />;
};

export default Page;
