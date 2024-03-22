import React from 'react';

import { Avatar, Card } from 'flowbite-react';

export default function AllocatePupils({ pdfPages, setPhase, gradings }) {
  let pupils = [
    { student_id: 1, student_name: "Alex Johnson" },
    { student_id: 2, student_name: "Maria Garcia" },
    { student_id: 3, student_name: "Liam Smith" }
  ];

  // Handler for clicking on a pupil
  const handlePupilClick = (student_id) => {
    console.log(`Pupil clicked: ${student_id}`);
    // Implement any specific logic you need here, such as using setPhase or modifying gradings
  };

  // Handler for clicking on a PDF page
  const handlePdfPageClick = (pdfPageSrc) => {
    console.log(`PDF page clicked: ${pdfPageSrc}`);
    // Implement any specific logic you need here
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h2>Pupils</h2>
        <ul>
          {pupils.map(pupil => (
            // <Card key={pupil.student_id} className="m-2" style={{ width: '18rem', cursor: 'pointer' }} onClick={() => handlePupilClick(pupil.student_id)}>
            //   <Card.Body>
            //     <h5 className="text-xl font-medium tracking-tight">{pupil.student_name}</h5>
            //   </Card.Body>
            // </Card>
            <li key={pupil.student_id} onClick={() => handlePupilClick(pupil.student_id)} style={{ cursor: 'pointer' }}>
              {pupil.student_name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>PDF Pages</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {pdfPages.map((pdfPageSrc, index) => (
            <Avatar key={index} img={pdfPageSrc} size="xl" onClick={() => handlePdfPageClick(pdfPageSrc)} />
            // <img
            //   key={index}
            //   src={pdfPageSrc}
            //   alt={`PDF Page ${index + 1}`}
            //   onClick={() => handlePdfPageClick(pdfPageSrc)}
            //   style={{ maxWidth: '100px', cursor: 'pointer', margin: '5px' }}
            // />
          ))}
        </div>
      </div>
    </div>
  );
}
