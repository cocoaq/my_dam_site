
import React, { useRef, useState, useEffect } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Button from '@mui/material/Button';
import { Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function InputCommunity() {
    const navigate = useNavigate();
    const quillRef = useRef(null);
    const [value, setValue] = useState('');
    const [textCount, setTextCount] = useState(0);
    const MAX_LENGTH = 100000;

    const [titleData, setTitle] = useState('');
    const [writer, setWriter] = useState(''); 
    const [isNotice, setIsNotice] = useState(false); // 공지사항 체크 여부
    const [isManager, setIsManager] = useState(false); // 매니저 여부
    const [userData, setUserData] = useState(null); // 사용자 정보


    useEffect(() => {
        const token = localStorage.getItem("token");
        const MEM_ID = localStorage.getItem("MEM_ID");
        const MEM_NAME = localStorage.getItem("MEM_NAME");
        const MEM_NO = localStorage.getItem("MEM_NO");

        if (token && MEM_ID && MEM_NAME) {
            setUserData({ MEM_ID, MEM_NAME, MEM_NO: parseInt(MEM_NO, 10) });
            setWriter(MEM_NAME);
            setIsManager(parseInt(MEM_NO, 10) === 1);
        }
    }, []);

    
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

    const handleNoticeChange = () => {
        setIsNotice(!isNotice);
    };


    // 글쓰기 제출
    const handleSubmit = async () => {
        if (!titleData.trim() || !value.trim() ||  (!userData && !writer.trim())) {
            alert("제목, 작성자, 내용을 입력해주세요.");
            return;
        }

        const editor = quillRef.current.getEditor();
        const htmlContent = editor.root.innerHTML;
        const createDate = new Date().toISOString();

        const no = localStorage.getItem("MEM_NO")==null ? 0 : localStorage.getItem("MEM_NO");

        const postData = {
            title: titleData,
            content: htmlContent,
            writer: writer + "/" + no, 
            date: createDate,
            type: isNotice ? 1 : 0
        };
        console.log(postData);
        try {
            const response = await fetch("http://tiri99.dothome.co.kr/api/community_write.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": userData ? `Bearer ${localStorage.getItem("token")}` : ""
                },
                body: JSON.stringify(postData),
            });
    
            const text = await response.text(); 
            console.log("서버 응답:", text);
    
            try {
                const result = JSON.parse(text); // JSON 변환
                if (result.success) {
                    alert("게시글이 등록되었습니다.");
                    navigate("/blog");
                } else {
                    alert(result.message || "글 작성에 실패했습니다.");
                }
            } catch (jsonError) {
                console.error("JSON 변환 실패:", text);
                alert("서버 응답이 JSON 형식이 아닙니다.");
            }
        } catch (error) {
            console.error("에러 발생:", error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <h3>펝 게시글 쓰기</h3>
            <input
                className="inputTitle"
                type="text"
                placeholder="제목"
                value={titleData}
                onChange={handleTitleChange}
            />
            { !userData && (
                <input type='text' 
                className="inputWriter"
                placeholder='작성자'
                value={writer}
                onChange={(e) => setWriter(e.target.value)}
                />
            )}
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
            {isManager && (
                <div>
                    <Checkbox checked={isNotice} 
                        onChange={handleNoticeChange} />공지사항 
                    </div>
            )}
            
            <br />
            <Button 
                className='inputButtonStyle'
                variant="contained" sx={{
                    backgroundColor: '#7115e9', 
                    '&:hover': {
                        backgroundColor: '#bf65e5', 
                    },
                }} 
                onClick={handleSubmit}>전송</Button>
        </div>
    );
}

export default InputCommunity;