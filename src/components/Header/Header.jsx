import trollFace from './../../assets/troll-face.png';

import './Header.css'

export default () => {
    return (
        <header>
            <div className='logo'>
                <img src={trollFace} alt='TrollFace' /> 
                <h1>
                    MemeGenerator
                </h1>
            </div>
            <div className='project'>
                <p>React Course - Project 3</p>
            </div>
        </header>
    )
}