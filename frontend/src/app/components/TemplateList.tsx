'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/axios';
import grapesjs from 'grapesjs';
import Image from 'next/image';

type Props = { websiteSlug: string };

const TemplateList = (props: Props) => {
  const [pageContent, setPageContent] = useState({});
  const [templates, setTemplates] = useState<{ id: number; name: string }[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const { websiteSlug } = props;

  useEffect(() => {
    const func = async () => {
      try {
        const response = await axiosInstance.get(`websites/${websiteSlug}/pages/index`);
        setPageContent(response.data.content);
      } catch (error) {}
    };
    func();
  }, [websiteSlug]);

  // useEffect(() => {
  //   const func = async () => {
  //     try {
  //       const response = await axiosInstance.get('templates');
  //       setTemplates(response.data);
  //     } catch (error) {}
  //   };
  //   func();
  // }, []);

  useEffect(() => {
    const func = async () => {
      try {
        // const response = await axiosInstance.get('templates');
        // setTemplates(response.data);
        setTemplates([
          { id: 1, name: 'Default Template' },
          { id: 2, name: 'New Template' },
        ]);
      } catch (error) {}
    };
    func();
  }, []);

  const clickTemplate = async (id: number) => {
    if (id === 1) {
      const response = await fetch('/defaultTemplate.html');
      const template = await response.text();
      setSelectedTemplate(template);
    } else if (id === 2) {
      const response = await fetch('/newTemplate.html');
      const template = await response.text();
      setSelectedTemplate(template);
    }
  };

  const updateTemplate = async () => {
    const tempContainer = document.createElement('div');
    const editor = grapesjs.init({
      container: tempContainer,
    });
    editor.setComponents(selectedTemplate);
    const projectData = editor.getProjectData();

    try {
      const response = await axiosInstance.patch(`/websites/${websiteSlug}/pages/index`, projectData);
      if (response.status === 200) {
        window.location.href = `/home/u/${websiteSlug}`;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="container mx-auto flex justify-between py-4">
        <h1 className="text-2xl font-bold">Templates</h1>
        {selectedTemplate !== '' && (
          <div>
            <button
              onClick={() => setSelectedTemplate('')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Back
            </button>
            <button
              onClick={() => updateTemplate()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Choose this template
            </button>
          </div>
        )}
      </div>
      {selectedTemplate === '' ? (
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3">
          {templates.map((template) => (
            <div className="border-2" key={template.id} onClick={() => clickTemplate(template.id || 0)}>
              <h2>{template.name}</h2>
              {template.id === 1 ? (
                <Image src="/defaultTemplate.png" alt="default template" width={480} height={480} />
              ) : (
                <Image src="/newTemplateThumnail.png" alt="new template" width={480} height={480} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: selectedTemplate }} />
      )}
    </div>
  );
};

export default TemplateList;
