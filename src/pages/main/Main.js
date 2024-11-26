import React, { useEffect, useMemo, useState } from 'react';
import { Cookies } from 'react-cookie';
import ReactDOM from 'react-dom';
import './main.css';
import Constents from './MainContents.js'

function Main() {
    const cookies = useMemo(() => new Cookies(), [] );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getMidnightExpiry = () => {
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0); // 오늘 자정으로 설정
        return midnight;
    };

    useEffect(() => {
        const modalClosed = cookies.get('modalClosed');
        if(!modalClosed){
            setIsModalOpen(true);
        }
    }, [cookies]);

    const closeModal = () => {
        setIsModalOpen(false);
        cookies.set('modalClosed', true, {path: '/', expires: getMidnightExpiry()});
    };

    return (
        <div>
            <Constents />
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
       
        );     
}

function Modal({isOpen, onClose}){

    if(!isOpen) return null;
    
    return ReactDOM.createPortal(
        <div id='mainDiv' onClick={onClose}>
        <img id='mainImg' src='/dam_00.png' alt='메인 이미지. Develoment And Me하고 적혀있다.'/>
        <p id='modalTxt'>아무 곳이나 클릭하세요.</p>
    </div>,
     document.body
    );
}

export default Main;
