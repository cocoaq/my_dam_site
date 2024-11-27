import React, { useState, useEffect } from 'react';


function MainContact() {
    const githubUrl = "https://github.com/cocoaq/my_dam_site";

    const [hoverSkill, setHoverSkill] = useState(null);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [skill, setSkill] = useState(null);

    useEffect(() => {
        fetch('/data/mainData.JSON')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to load JSON data');
                }
                return response.json();
            })
            .then((data) => setSkill(data))
            .catch((error) => console.error(error));
    }, []);


    const handleMouseEnter = (skill, event) => {
        if (!event) return;
        const  elementRect = event.target.getBoundingClientRect();
        setHoverSkill(skill);
        setModalPosition({ 
            X: elementRect.left + window.scrollX, 
            y: elementRect.bottom + window.scrollY });
    }

    const handleMouseLeave = () => {
        setHoverSkill(null);
    }

    if(!skill) {
        return <div>Loading...</div>
    }

    return (
    <div>
        <div id='mainContentDiv'>
        <img id='contentImg' src='/dam_00.png' alt='메인 이미지. Develoment And Me하고 적혀있다.'/>
        <h3 id='onCursor' onClick={()=>{window.open(githubUrl)}}>겗 this site github (현재 비공개)</h3>
        <div id='skillList'><h4>돉</h4>
        {Object.keys(skill).map((skill) => (
            <h4 
                key={skill} 
                className='skillItem'
                onMouseEnter={(e) => handleMouseEnter(skill, e)}
                onMouseLeave={handleMouseLeave}
                >
                    #{skill}
                </h4>
        ))}
        </div> 
        <h4>윛 대한민국 서울</h4>
        <h4>멞 tiri99@naver.com</h4>
        </div>
        {hoverSkill && (
            <div
                className='tooltip'
                style={{
                    top: modalPosition.y + 5,
                    left: modalPosition.x + 10
                }}
            >
                    {skill[hoverSkill]}
                </div>
        )}
    </div>
        );     
}

export default MainContact;