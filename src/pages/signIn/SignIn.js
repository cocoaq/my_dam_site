import React from 'react';
import Button from '@mui/material/Button';


function Contact() {
    return (
        <div className='signBG'>

            <h3>관리자 로그인</h3>
            
            <div className='signField'>
            <input type='text' className='signPass' placeholder="ID" id='signIdField'/>
            <input type='password'  className='signPass' placeholder="PASS" id='signPassField'/> 
            
            <Button 
                id='signButton'
                variant="contained" sx={{
                    backgroundColor: '#7115e9', // 기본 배경색
                    '&:hover': {
                        backgroundColor: '#bf65e5', // 호버 상태 배경색
                    },
                }} 
                // onClick={testLog}
                >확인</Button>
            </div>

        </div>
        );     
}

export default Contact;