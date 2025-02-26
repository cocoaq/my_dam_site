import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { Document, Page, pdfjs } from 'react-pdf';

//pdf
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
//pdf thumbnail
import * as pdfjsLib from 'pdfjs-dist/webpack';

Modal.setAppElement("#root"); // 모달 접근성



function Portfolio() {

    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

    const [portOpen, setPortOpen] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [portPDF, setPortPDF] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);


    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const [scale, setScale] = useState(1.0); // PDF 확대/축소 상태 추가




    useEffect(() => {
        fetch('/data/portData.JSON')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to load JSON data');
                }
                return response.json();
            })
            .then((data) => setPortPDF(data.portfolio))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (portOpen) {
            document.body.style.overflow = "hidden"; // 🔒 스크롤 잠금
        } else {
            document.body.style.overflow = "auto"; // 🔓 스크롤 해제
        }

        return () => {
            document.body.style.overflow = "auto"; // 🔄 컴포넌트 언마운트 시 원래 상태로 복구
        };
    }, [portOpen]);



    if (!portPDF) {
        return <div>Loading...</div>
    }

    const portModalOn = (index) => {
        setSelectedFile(portPDF[index].route);
        setPortOpen(true);
    };

    const PdfThumbnail = ({ fileUrl }) => {
        const [imageUrl, setImageUrl] = useState(null);
        const canvasRef = useRef(null);
        const renderTaskRef = useRef(null); // ✅ 현재 실행 중인 렌더링 작업 저장

        useEffect(() => {
            let cancelRendering = false;

            const loadPdf = async () => {
                try {
                    const loadingTask = pdfjsLib.getDocument(fileUrl);
                    const pdf = await loadingTask.promise;
                    const page = await pdf.getPage(1);

                    const scale = 1.5;
                    const viewport = page.getViewport({ scale });

                    const canvas = canvasRef.current;
                    if (!canvas) return;
                    const context = canvas.getContext("2d");
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;

                    const renderContext = { canvasContext: context, viewport };

                    // 렌더링 작업이 있으면 중단
                    if (renderTaskRef.current) {
                        renderTaskRef.current.cancel();
                    }

                    //새로운 렌더링 작업 실행
                    renderTaskRef.current = page.render(renderContext);

                    renderTaskRef.current.promise.then(() => {
                        if (!cancelRendering) {
                            const imageDataUrl = canvas.toDataURL("image/png");
                            setImageUrl(imageDataUrl);
                        }
                    }).catch(err => {

                    });

                } catch (error) {

                }
            };

            loadPdf();

            return () => {
                cancelRendering = true;
                if (renderTaskRef.current) {
                    renderTaskRef.current.cancel(); // 언마운트 시 기존 렌더링 중단
                }
            };
        }, [fileUrl]);

        return (
            <div>
                {imageUrl ? (

                    <img
                        src={imageUrl}
                        alt="PDF 썸네일"
                        width="100%"
                        style={{ objectFit: "cover" }} // ✅ style 속성 사용
                    />

                ) : (
                    <canvas ref={canvasRef} style={{ display: "none" }} />
                )}
            </div>
        );
    };


    return (
        <div className='portBG'>
            <h3>큷 portfolio</h3>
            <div className='portContentDiv'>
                {portPDF.map((portPDF, index) => (
                    <div key={index} className='portDiv' onClick={() => portModalOn(index)} >
                        <PdfThumbnail fileUrl={portPDF.route} />
                        <p className='portTitle'>{portPDF.title}</p>
                        <hr className='portHr' />
                        <small className='portYear'>{portPDF.date}</small>
                    </div>
                ))}

            </div>

            <Modal
                className='modalStyle'
                isOpen={portOpen}
                onRequestClose={() => setPortOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)"
                    },
                    content: {
                        width: "80%",
                        height: "70%",
                        margin: "auto",
                        position: "absolute",
                        top: "calc(50% + 46px)",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px"
                    }
                }}
            >
                <button onClick={() => setPortOpen(false)} className="closeButton">닫기 </button>

                <div className='pdfConDiv'>
                    <div className="pdfControls">
                        <button onClick={() => setScale(scale => Math.max(scale - 0.2, 0.5))}>축소</button>
                        <span>돉{Math.round(scale * 100)}% </span>
                        <button onClick={() => setScale(scale => Math.min(scale + 0.5, 2.0))}>확대</button>
                    </div>
                </div>


                {selectedFile && (
                    <div className="pdfContainer">
                        <Document
                            file={selectedFile}
                            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                        >
                            <Page pageNumber={currentPage} scale={scale} />
                        </Document>
                    </div>
                )}

                <div className="pdfControls">
                    <button disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>◀ 이전</button>
                    <span>{currentPage} / {numPages}</span>
                    <button disabled={currentPage >= numPages} onClick={() => setCurrentPage(currentPage + 1)}>다음 ▶</button>
                </div>
            </Modal>
        </div>
    );
}

export default Portfolio;
