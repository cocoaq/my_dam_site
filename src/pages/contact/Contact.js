import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';


function Contact() {

    const [formData, setFormData] = useState({
        email: '',
        title: '',
        message: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = 'http://tiri99.dothome.co.kr/api/send-email.php'; // PHP 파일의 경로
            const response = await axios.post(apiUrl, formData);
            //const response = await axios.post('http://localhost:5000/send-email', formData);
            //const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            //const response = await axios.post(`${apiUrl}/send-email`, formData);
            alert(response.data.message);
        } catch (error) {
            alert('메일 전송 실패');
            console.error(error);
        }
    };

    return (
        <div className='contBG'>

            <h3>Contact</h3>

            <form onSubmit={handleSubmit}>
                <div className='contField'>
                    <input type='text' className='contTitle' name='title'
                    placeholder="제목" id='contTitleField' 
                    value={formData.title} onChange={handleChange} required />

                    <input type='email' className='contMail' name='email'
                    placeholder='e-mail' id='contMailField' 
                    value={formData.email} onChange={handleChange} required />

                    <textarea placeholder='내용' className='contArea' name='message'
                    id='contContentField' 
                    value={formData.message} onChange={handleChange} required />

                </div>
                 <Button
                    id='contButton'
                    type='submit'
                    variant="contained" sx={{
                        backgroundColor: '#7115e9', // 기본 배경색
                        '&:hover': {
                            backgroundColor: '#bf65e5', // 호버 상태 배경색
                        },
                    }}
            
                >전송</Button> 
            </form>

        </div>
    );
}

export default Contact;