'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/axios';
import grapesjs from 'grapesjs';
import Image from 'next/image';
import NavbarAccount from './NavbarAccount';

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
          { id: 2, name: 'Sena Template' },
          { id: 3, name: 'Mvc Template' },
          { id: 4, name: 'Basic Template' },
          { id: 5, name: 'Doe Template' },
          { id: 6, name: 'Green Template' },
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
    } else if (id === 3) {
      const response = await fetch('/oxer-html/index.html');
      const template = await response.text();
      setSelectedTemplate(template);
    }else if (id === 4) {
      const response = await fetch('/Resume-Ben/index.html') ;
      const template = await response.text();
      setSelectedTemplate(template);
    }else if (id === 5) {
      const response = await fetch('/johndoe/public_html/index.html') ;
      const template = await response.text();
      setSelectedTemplate(template);
    }else if (id === 6) {
      const response = await fetch('/templatemo_531_reflux/index.html') ;
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
    <NavbarAccount/>
    <div className="container px-6 my-12 mx-auto">
      <div className="container mx-auto flex justify-between py-4 ">
        <h1 className="text-3xl font-bold">Templates</h1>
  
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
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            >
              Choose this template
            </button>
          </div>
        )}
      </div>
      {selectedTemplate === '' ? (
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3">
          {templates.map((template) => (
            <div className="bg-white border border-gray-200 hover:shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out  font-bold " key={template.id} onClick={() => clickTemplate(template.id || 0)}>
              <h2>{template.name}</h2>
              <Image src={`/${template.id}_Template.png`} alt="default template" width={480} height={480} />
            </div>
          ))}
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: selectedTemplate }} />
      )}
    </div>
    </div>
  );
};

export default TemplateList;
