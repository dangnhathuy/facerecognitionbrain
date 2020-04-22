import React from 'react';
import './facerecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
                <div className='bounding-box' style={{top: box.topRow, right: box.rightColumn, bottom: box.bottomRow, left: box.leftColumn}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;