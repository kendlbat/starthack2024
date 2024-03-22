import { FileInput } from "flowbite-react";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import FileDropzone from "./FileDropzone";

// Added styling for the scrollable container
const scrollableContainerStyle = {
  maxHeight: "700px", // Set a maximum height for the scrollable area
  overflowY: "scroll", // Enable vertical scrolling
  width: "100%", // Ensure the container takes up the full width of its parent
  border: "1px solid #ccc", // Optional: adds a border to make the container visually clear
  borderRadius: "5px", // Optional: rounds the corners of the border
};

const FileSelector = ({ setPhase, gradings, setGradings,pdfPages,setPdfPages }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    

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
            setPhase(2);
        }
    };

    return (
        <div className="flex flex-col items-center h-full overflow-auto">
            <div className="w-2/3 items-center justify-center flex pt-10 overflow-auto">
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
