
import React, { useRef, useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function InputCommunity() {
    const quillRef = useRef(null);
    const [value, setValue] = useState('');
    const [textCount, setTextCount] = useState(0);
    const MAX_LENGTH = 100000;

    
    const quillModules = {
        toolbar: [
            [{ header: [1, 2, false] }], 
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ color: [] }, { background: [] }],
            ['link'],
            ['clean'],
        ],
    };
    

    const handleChange = (content) => {
        setValue(content);

        const editor = quillRef.current.getEditor();
        const text = editor.getText(); 
        setTextCount(text.trim().length); 

        if(textCount >= MAX_LENGTH){
            alert('글자수 초과');
        }

    }


    const testLog = () => {
        const editor = quillRef.current.getEditor();
        const htmlContent = editor.root.innerHTML;
        console.log('HTML:', htmlContent);
    }


    return (
        <div>
            <span>글자 수 : {textCount} (10,000자 제한)</span>
            <ReactQuill 
                className="editor-container"
                
                ref={quillRef}
                theme="snow" 
                value={value} 
                onChange={handleChange}
                modules={ quillModules } 
            />
            <button onClick={testLog}>확인or전송</button>
        </div>
    );
}

export default InputCommunity;