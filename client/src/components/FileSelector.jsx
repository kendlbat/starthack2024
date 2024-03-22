import React, { useState } from 'react';

// Styling for the container
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
};

// Styling for the input
const inputStyle = {
  border: '2px solid #007bff',
  borderRadius: '5px',
  padding: '10px',
  margin: '5px',
  cursor: 'pointer',
};

// Styling for the label
const labelStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const FileSelector = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    
    setSelectedFile(file);
    console.log('File type:', file ? file.type : 'No file selected');
    if (file.type ==="application/pdf") {
      let fileStream = await file.arrayBuffer();
    }
  };

  return (
    <div style={containerStyle}>
      <label htmlFor="file-upload" style={labelStyle}>
        Choose a file
      </label>
      <input
        id="file-upload"
        type="file"
        style={inputStyle}
        onChange={handleFileChange}
        hidden
      />
      {selectedFile && <p>File: {selectedFile.name}</p>}
    </div>
  );
};

export default FileSelector;