import React, { useState } from 'react';

import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";

function Login({ setIsLoggedIn }) {
    const [formData, setFormData] = useState({ mem_id: "", mem_pass: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { mem_id, mem_pass } = formData;
    
        try {
            const response = await fetch("http://tiri99.dothome.co.kr/api/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mem_id, mem_pass }),
            });
    
            const text = await response.text();
   
            try {
                const data = JSON.parse(text);
                if (data.success) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("MEM_ID", data.MEM_ID);
                    localStorage.setItem("MEM_NAME", data.MEM_NAME);
                    localStorage.setItem("MEM_NO", data.MEM_NO);
                    alert("로그인 성공!");
                    window.location.href = "/";
                } else {
                    alert("로그인 실패: " + data.message);
                }
            } catch (jsonError) {
                console.error("JSON 파싱 오류:", jsonError);
                alert("서버 응답이 올바르지 않습니다.");
            }
    
        } catch (error) {
            console.error("로그인 요청 중 오류 발생:", error);
            alert("서버 오류가 발생했습니다.");
        }

        setFormData({ mem_id: "", mem_pass: "" });
        e.target.reset();
    };
    


    return (
        <div className='loginBG'>

            <h3>쟒 Log In</h3>

            <div className='loginField'>
                <form onSubmit={handleSubmit}>
                    <input type='text' className='loginPass' name='mem_id' placeholder="ID" id='loginIdField' onChange={handleChange} required />
                    <input type='password' className='loginPass' name='mem_pass' placeholder="PASS" id='loginPassField' onChange={handleChange} required />

                    <NavLink to="/signin">
                        <p className='loginBtn signInBtn'>Sign In</p>
                    </NavLink>

                    <Button
                        id='loginButton'
                        type='submit'
                        disabled={!formData}
                        variant="contained" sx={{
                            backgroundColor: '#7115e9', 
                            '&:hover': {
                                backgroundColor: '#bf65e5', 
                            },
                        }}

                    >확인</Button>
                </form>
            </div>

        </div>
    );
}

export default Login;