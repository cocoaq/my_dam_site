import React, { useState }from 'react';

import axios from 'axios';

import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";

function Login( {setUser} ) {
    const [formData, setFormData] = useState({ mem_id:"", mem_pass:""});
    
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://tiri99.dothome.co.kr/api/login.php", formData);
          if (response.data.success) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setUser(response.data.user);
            alert("로그인 성공!");
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          alert("서버 오류");
          console.error(error);
        }
      };
    

    return (
        <div className='loginBG'>

            <h3>쟒 Log In</h3>
            
            <div className='loginField'>
            <form onSubmit={handleSubmit}>
                <input type='text' className='loginPass' placeholder="ID" id='loginIdField' onChange={handleChange} required />
                <input type='password'  className='loginPass' placeholder="PASS" id='loginPassField' onChange={handleChange} required /> 

                <NavLink to="/signin">
                            <p className='loginBtn signInBtn'>Sign In</p>
                </NavLink>

                <Button 
                    id='loginButton'
                    type='submit'
                    variant="contained" sx={{
                        backgroundColor: '#7115e9', // 기본 배경색
                        '&:hover': {
                            backgroundColor: '#bf65e5', // 호버 상태 배경색
                        },
                    }} 

                    >확인</Button>
            </form>
            </div>

        </div>
        );     
}

export default Login;