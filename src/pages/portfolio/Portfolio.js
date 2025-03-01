import { useEffect, useRef, useState, useMemo, useCallback, memo } from "react";
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
            .then((response) => response.ok ? response.json() : Promise.reject('Failed to load JSON'))
            .then((data) => setPortPDF(data.portfolio))
            .catch(console.error);
    }, []);

    useEffect(() => {
        document.body.style.overflow = portOpen ? "hidden" : "auto";
        return () => { document.body.style.overflow = "auto"; };
    }, [portOpen]);


    const portModalOn = useCallback((file) => {
        setSelectedFile(file);
        setPortOpen(true);
        setCurrentPage(1);
    }, []);



    //랜더링 줄이기용
    const memoizedDocument = useMemo(() => (
        <Document file={selectedFile} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
            <Page pageNumber={currentPage} scale={scale} />
        </Document>
    ), [selectedFile, currentPage, scale]);


    const PdfThumbnail =  memo(({ fileUrl }) => {
        const canvasRef = useRef(null);
        const [imageUrl, setImageUrl] = useState(null);
        const renderTaskRef = useRef(null);

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

                    // 이전 작업이 있으면 중단
                    if (renderTaskRef.current) {
                        renderTaskRef.current.cancel();
                    }

                    // 새로운 작업 실행
                    renderTaskRef.current = page.render(renderContext);
                    renderTaskRef.current.promise.then(() => {
                        if (!cancelRendering) {
                            const imageDataUrl = canvas.toDataURL("image/png");
                            setImageUrl(imageDataUrl);
                        }
                    }).catch(() => { });

                } catch (error) {
                    console.error("썸네일 로딩 오류:", error);
                }
            };

            loadPdf();

            return () => {
                cancelRendering = true;
                if (renderTaskRef.current) {
                    renderTaskRef.current.cancel();
                }
            };
        }, [fileUrl]);

        return (
            <div>
                {imageUrl ? (
                    <img src={imageUrl} alt="PDF 썸네일" width="100%" style={{ objectFit: "cover" }} />
                ) : (
                    <canvas ref={canvasRef} style={{ display: "none" }} />
                )}
            </div>
        );
    });
    
    const memoizedPortfolios = useMemo(() => (
        portPDF?.map((item, index) => (
            <div key={index} className='portDiv' onClick={() => portModalOn(item.route)} >
                <PdfThumbnail fileUrl={item.route} />
                <p className='portTitle'>{item.title}</p>
                <hr className='portHr' />
                <small className='portYear'>{item.date}</small>
            </div>
        ))
    ), [portPDF, portModalOn]);


    return (
        <div className='portBG'>
            <h3>큷 portfolio</h3>
            <div className='portContentDiv'>{memoizedPortfolios}</div>
            <Modal
                className='modalStyle'
                isOpen={portOpen}
                onRequestClose={() => {
                    setPortOpen(false);
                    setSelectedFile(null);
                }}
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
                <button onClick={() => setPortOpen(false)} className="closeButton">닫기</button>

                <div className='pdfConDiv'>
                    <div className="pdfControls">
                        <button onClick={() => setScale(scale => Math.max(scale - 0.2, 0.5))}>축소</button>
                        <span>돉{Math.round(scale * 100)}% </span>
                        <button onClick={() => setScale(scale => Math.min(scale + 0.5, 2.0))}>확대</button>
                    </div>
                </div>

                <div className="pdfContainer">{selectedFile && memoizedDocument}</div>

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
