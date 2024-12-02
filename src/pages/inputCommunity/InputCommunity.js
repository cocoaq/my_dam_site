
import React, { useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

function InputCommunity() {
    const editorRef = useRef(); // 에디터 참조 생성

    const handleGetMarkdown = () => {
        const editorInstance = editorRef.current.getInstance(); // 에디터 인스턴스 가져오기
        const markdown = editorInstance.getMarkdown(); // Markdown 가져오기
        console.log(markdown); // 확인용

    };

    return (
        <div>
            <Editor
                ref={editorRef} // 에디터 참조 연결
                initialValue="　"
                previewStyle="vertical"
                height="400px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                moveCursorToStart={true}
                toolbarItems={[
                    ['bold', 'italic', 'strike'], // 텍스트 스타일링
                    ['ul', 'ol'], // 리스트 도구
                    ['link', 'image', 'table'], // 삽입 도구
                ]}
                />
            <button onClick={handleGetMarkdown}>Get Markdown</button>
        </div>
    );
}

export default InputCommunity;