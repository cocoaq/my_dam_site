import React, { useState } from 'react';
import Modal from "react-modal";
import { Document, Page, pdfjs } from 'react-pdf';

//pdf
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

Modal.setAppElement("#root"); // 모달 접근성

function Portfolio() {

    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

    const [portOpen, setPortOpen] = useState(false);
    const [numPages, setNumPages] = useState(null);

    const file = "/pdf/portfolio01.pdf";


    return (
        <div className='portBG'>
            <h3>큷 portfolio</h3>
            <div className='portDiv' onClick={() => setPortOpen(true)}>
                <img className='portImg' src='/dam_01.png' alt='썸네일' />
                <p className='portTitle'>제목</p>
                <small className='portYear'>년도</small>
            </div>

            <Modal className='modalStyle' isOpen={portOpen} onRequestClose={() => setPortOpen(false)} >
                <Document
                    className='docuStyle'
                    file={file}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                    {numPages ? (
                        Array.from({ length: numPages }, (_, index) => (
                            <Page key={index} pageNumber={index + 1} />
                        ))
                    ) : (
                        <Page pageNumber={1} />
                    )}
                </Document>
            </Modal>
        </div>
    );
}

export default Portfolio;
