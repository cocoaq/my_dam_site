import React from 'react';


function MainContact() {
    const githubUrl = "https://github.com/cocoaq/my_dam_site";
    return (
    <div>
        <div id='mainContentDiv'>
        <img id='contentImg' src='/dam_00.png' alt='메인 이미지. Develoment And Me하고 적혀있다.'/>
        <h3 id='onCursor' onClick={()=>{window.open(githubUrl)}}>겗 this site github (현재 비공개)</h3>
        {/* <h4>멞 tiri99@naver.com</h4> */}
        <h3>돉 #Java #React #SQL #Spring #Ajax #JavaScript #HTML </h3>
        <h4>윛 대한민국 서울</h4>
        
        </div>
    </div>
        );     
}

export default MainContact;