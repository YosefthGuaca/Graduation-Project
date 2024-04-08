'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/axios';
import grapesjs from 'grapesjs';

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
        setTemplates([{ id: 1, name: 'Default Template' }]);
      } catch (error) {}
    };
    func();
  }, []);

  const clickTemplate = async (id: number) => {
    console.log('clicked id: ', id);
    const response = await fetch('http://localhost:3000/defaultTemplate.html');
    const template = await response.text();
    setSelectedTemplate(template);
  };

  const updateTemplate = async () => {
    const tempContainer = document.createElement('div');
    const editor = grapesjs.init({
      container: tempContainer,
    });
    editor.setComponents(selectedTemplate);
    const projectData = editor.getProjectData();
    console.log('projectData: ', projectData);

    try {
      const response = await axiosInstance.patch(
        `http://localhost:4000/api/websites/${websiteSlug}/pages/index`,
        projectData,
      );
      if (response.status === 200) {
        window.location.href = `http://localhost:3000/home/u/${websiteSlug}`;
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
            <div className="border-2 p-48" key={template.id} onClick={() => clickTemplate(template.id || 0)}>
              <h2>{template.name}</h2>
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
