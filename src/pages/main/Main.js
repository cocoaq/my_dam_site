import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './main.css';

function Main() {
    const [isModalOpen, setIsModalOpen] = useState(true);

    // const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            main
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
       
        );     
}

function Modal({isOpen, onClose}){
    if(!isOpen) return null;

    return ReactDOM.createPortal(
        <div id='mainDiv' onClick={onClose}>
        <img id='mainImg' src='/dam_00.png' alt='메인 이미지. Develoment And Me하고 적혀있다.'/>
    </div>,
     document.body
    );
}


export default Main;
