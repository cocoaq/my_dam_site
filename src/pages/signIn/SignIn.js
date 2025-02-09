import React from 'react';
import Button from '@mui/material/Button';

function SignIn() {
    return (
        <div className='loginBG'>

            <h3>펝 Sign In</h3>
            
            <div className='loginField'>
            <input type='text' className='loginPass' placeholder="ID" id='signinIdField'/>
            <input type='password'  className='loginPass' placeholder="PASS" id='signinPassField'/>
            <input type='text' className='loginPass' placeholder="이름" id='signinNameField'/>
            <input type='text' className='loginPass' placeholder="자기소개" id='signinCommentField'/>
            
            <Button 
                id='loginButton'
                variant="contained" sx={{
                    backgroundColor: '#7115e9', // 기본 배경색
                    '&:hover': {
                        backgroundColor: '#bf65e5', // 호버 상태 배경색
                    },
                }} 
                >확인</Button>
            
            </div>

        </div>
        );     
}

export default SignIn;