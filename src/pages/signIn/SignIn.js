import React, { useState } from 'react';
import Button from '@mui/material/Button';

function SignIn() {

  const [form, setForm] = useState({ mem_id: "", mem_pass: "", mem_name: "", mem_comment: "" });
  const [errors, setErrors] = useState({ mem_id: "", mem_pass: "", mem_name: "", mem_comment: "" });

  const validate = (name, value) => {
    let message = "";
    switch (name) {
      case "mem_id":
        if (!/^[a-zA-Z0-9]{1,15}$/.test(value)) message = "아이디는 영문과 숫자의 15자 이하로 입력하세요.";
        break;
      case "mem_pass":
        if (!/^[a-zA-Z0-9]{1,20}$/.test(value)) message = "비밀번호는 영문과 숫자로 20자 이하로 입력하세요.";
        break;
      case "mem_name":
        if (value.length > 20) message = "이름은 20자 이하로 입력하세요.";
        break;
      case "mem_comment":
        if (value.length > 200) message = "코멘트는 200자 이하로 입력하세요.";
        break;
      default:
        break;
    }
    return message;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const isFormValid = Object.values(errors).every((msg) => msg === "") &&
    form.mem_id && form.mem_pass && form.mem_name;
  const handleSubmit = async (e) => {
    // console.log("data:", form);
    e.preventDefault();

    setForm({ mem_id: "", mem_pass: "", mem_name: "", mem_comment: "" });
    e.target.reset();

    if (!isFormValid) return;

    try {
      const response = await fetch("http://tiri99.dothome.co.kr/api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

 

  return (
    <div className='loginBG'>

      <h3>솒 Sign In</h3>

      <div className='loginField'>
        <form onSubmit={handleSubmit}>
          <input type='text' className='loginPass' name='mem_id' onChange={handleChange} placeholder="ID" id='signinIdField' />
          <br />
          <small style={{ color: "#18148c" }}>{errors.mem_id}</small>

          <input type='password' className='loginPass' name='mem_pass' onChange={handleChange} placeholder="PASS" id='signinPassField' />
          <br />
          <small style={{ color: "#18148c" }}>{errors.mem_pass}</small>

          <input type='text' className='loginPass' name='mem_name' onChange={handleChange} placeholder="이름" id='signinNameField' />
          <br />
          <small style={{ color: "#18148c" }}>{errors.mem_name}</small>

          <input type='text' className='loginPass' name='mem_comment' onChange={handleChange} placeholder="자기소개" id='signinCommentField' />
          <br />
          <small style={{ color: "#18148c" }}>{errors.mem_comment}</small>

          <Button
            id='loginButton'
            type='submit'
            disabled={!isFormValid}
            sx={{
              backgroundColor: isFormValid ? "#7115e9" : "#ccc",
              "&:hover": { backgroundColor: isFormValid ? "#bf65e5" : "#ccc" },
            }}
            variant="contained"

          >확인</Button>

        </form>

      </div>

    </div>
  );
}

export default SignIn;