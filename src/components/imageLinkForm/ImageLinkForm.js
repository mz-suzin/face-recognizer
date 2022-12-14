import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => { //destructuring the props so I can use oninputChange instead of props.onInputChange
    return (
        <div>
            <p className='f3'>
                {'Insert a picture below for the Magic Brain to find the face'}
            </p>
            {/* <p className='f3'>
                {'https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
            </p> */}
            <div className='center'>
                <div className='center form pa4 br3 shadow-2'>
                    <input 
                        className='f4 pa2 w-70 center' 
                        type='text' 
                        onChange={onInputChange}/>
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
                        onClick={onButtonSubmit}>
                    Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;