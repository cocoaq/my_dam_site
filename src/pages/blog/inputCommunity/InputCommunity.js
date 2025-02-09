
import React, { useRef, useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../blog.css';

import Button from '@mui/material/Button';
import { Checkbox } from '@mui/material';


function InputCommunity() {
    const quillRef = useRef(null);
    const [value, setValue] = useState('');
    const [textCount, setTextCount] = useState(0);
    const MAX_LENGTH = 100000;

    const [titleData, setTitle] = useState('');

    
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
    
//title
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

//quill
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
        const createDate = new Date().toISOString();

        const comData = {
            title : titleData,
            contsnt : htmlContent,
            date : createDate
        };
        console.log('HTML:', comData);


        
    }


    return (
        <div>
            <h3>게시글 쓰기</h3>
            <input
                className="inputTitle"
                type="text"
                placeholder="제목"
                value={titleData}
                onChange={handleTitleChange}
            />
            <br />

            <span>글자 수 : {textCount} (10,000자 제한)</span>
            <ReactQuill 
                className="editor-container"
                
                ref={quillRef}
                theme="snow" 
                value={value} 
                onChange={handleChange}
                modules={ quillModules } 
            />

            <Checkbox />공지사항
            <br />
            <Button 
                className='inputButtonStyle'
                variant="contained" sx={{
                    backgroundColor: '#7115e9', // 기본 배경색
                    '&:hover': {
                        backgroundColor: '#bf65e5', // 호버 상태 배경색
                    },
                }} 
                onClick={testLog}>전송</Button>
        </div>
    );
}

export default InputCommunity;