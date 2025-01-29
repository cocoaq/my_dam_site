import React from 'react';
import Button from '@mui/material/Button';


function Contact() {
    return (
        <div className='contBG'>

            <h3>Contact</h3>
            <div className='contField'>
                <input type='text' className='contTitle' placeholder="제목" id='contTitleField'/>
                <input type='email' className='contMail' placeholder='e-mail' id='contMailField' />
                <textarea placeholder='내용' className='contArea' id='contContentField'/>
            </div>
        
            <Button 
                id='contButton'
                variant="contained" sx={{
                    backgroundColor: '#7115e9', // 기본 배경색
                    '&:hover': {
                        backgroundColor: '#bf65e5', // 호버 상태 배경색
                    },
                }} 
                // onClick={testLog}
                >전송</Button>
        </div>
        );     
}

export default Contact;