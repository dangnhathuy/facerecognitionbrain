import React from 'react';
import './imagelinkform.css';

const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'this magic brain will detect faces in your pictures. give it a try.'}
            </p>
            <div className='center'>
                <div className= 'form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' placeholder='enter .jpg link here'onChange={onInputChange} />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-purple' onClick={onPictureSubmit}> detect </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;