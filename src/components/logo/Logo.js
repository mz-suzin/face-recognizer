import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
        <div className='center ma4 mt0'>
            <Tilt className='Tilt br2 shadow-0'>
                <div className='pa3'>
                    <img alt='logo' src={brain} width='150' height='150'/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;