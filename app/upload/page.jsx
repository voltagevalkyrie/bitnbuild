// pages/ImageGenerator.js
"use client"

import React, { useState } from 'react';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import MarkdownIt from 'markdown-it';
import { maybeShowApiKeyBanner } from '../gemini-api-banner'; // Adjust the path accordingly

const ImageGenerator = () => {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Use your API key here. For production, consider using environment variables.
  let API_KEY = 'AIzaSyAcmL9JUzosLrJuBEUDxmLCBXTKQFPtx-E';

  // Maybe show the API key banner
  maybeShowApiKeyBanner(API_KEY);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setOutput('Generating...');
    setLoading(true);

    const form = ev.target;
    const promptInput = form.elements.prompt.value;
    const fileInput = form.elements.fileInput.files[0];

    try {
      // Load the image as a base64 string
      const imageBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(fileInput);
      });

      // Assemble the prompt by combining the text with the chosen image
      let contents = [
        {
          role: 'user',
          parts: [
            { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } },
            { text: promptInput }
          ]
        }
      ];

      // Call the multimodal model and get a stream of results
      const genAI = new GoogleGenerativeAI("AIzaSyAcmL9JUzosLrJuBEUDxmLCBXTKQFPtx-E");
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash", // or gemini-1.5-pro
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      });

      const result = await model.generateContentStream({ contents });

      // Read from the stream and interpret the output as markdown
      let buffer = [];
      let md = new MarkdownIt();
      for await (let response of result.stream) {
        buffer.push(response.text());
        setOutput(md.render(buffer.join('')));
      }
    } catch (e) {
      setOutput('<hr>' + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="prompt" placeholder="Enter your prompt" required />
        <input type="file" name="fileInput" accept="image/*" required />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>
      <div className="output" dangerouslySetInnerHTML={{ __html: output }} />
    </div>
  );
};

export default ImageGenerator;
