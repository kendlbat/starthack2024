import { FileInput } from "flowbite-react";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import FileDropzone from "./FileDropzone";

// Styling for the input
const inputStyle = {
    border: "2px solid #007bff",
    borderRadius: "5px",
    padding: "10px",
    margin: "5px",
    cursor: "pointer",
};

// Styling for the label
const labelStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
};

const FileSelector = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [pdfPages, setPdfPages] = useState([]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        setSelectedFile(file);
        console.log("File type:", file ? file.type : "No file selected");
        if (file.type === "application/pdf") {
            const pdfData = new Uint8Array(await file.arrayBuffer());
            pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
            pdfjs
                .getDocument({ data: pdfData })
                .promise.then((pdf) => {
                    let pages = [];
                    for (let i = 1; i <= pdf.numPages; i++) {
                        pdf.getPage(i).then((page) => {
                            const scale = 1.5;
                            const viewport = page.getViewport({ scale });
                            const canvas = document.createElement("canvas");
                            const context = canvas.getContext("2d");
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;
                            const renderContext = {
                                canvasContext: context,
                                viewport: viewport,
                            };
                            page.render(renderContext).promise.then(() => {
                                pages.push(canvas.toDataURL("image/png"));
                                if (pages.length === pdf.numPages) {
                                    setPdfPages(pages);
                                }
                            });
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error loading PDF:", error);
                });
        }
    };

    return (
        <div class="flex flex-col items-center h-full bg-gray-100">
            <div className="w-2/3 items-center justify-center flex pt-10">
                <FileDropzone onChange={handleFileChange} />
            </div>
            {selectedFile && <p>File: {selectedFile.name}</p>}
            {pdfPages.length > 0 && (
                <div>
                    <h2>Converted Pages:</h2>
                    {pdfPages.map((page, index) => (
                        <img key={index} src={page} alt={`Page ${index + 1}`} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileSelector;
