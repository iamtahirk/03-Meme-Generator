import { useState, useEffect } from 'react';
import MemeImageDefault from './../../assets/memeimg.png';
import './Meme.css';


export default () => {
    const [meme, setMeme] = useState({topTxt: '', btmText: '', randomImage: MemeImageDefault});
    
    const [allMemes, setAllMemes] = useState(MemeImageDefault);

    function getMemeImages () {
        const imgIndex = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[imgIndex].url;
        // console.log(url)

        setMeme (prevMeme => ({
            ...prevMeme,
            randomImage:url
        }))
        meme.topTxt = '';
        meme.btmText = '';
    }

    
    function handleChange (e) {
        const {name, value} = e.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value,
        }))
    }

    /*
    useEffect(() => {
        console.log("useEffect ran")
        fetch(`https://api.imgflip.com/get_memes`)
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    */

    useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes();    
    }, [])

    return (
        <main>
            <form onSubmit={(e)=> e.preventDefault()}>
                <div className='inputs-container'>
                    <div className='inputs'>
                        <label htmlFor='topText'>Top text</label>
                        <input name="topTxt" id='topText' type='text' placeholder='Please enter Text'
                        onChange={handleChange} value={meme.topTxt} />
                    </div>

                    <div className='inputs'>
                        <label htmlFor='bottomText'>Bottom text</label>
                        <input name="btmText" id="bottomText" type='text' placeholder='Please enter Text'
                        onChange={handleChange} value={meme.btmText} />
                    </div>
                </div>
                <button onClick={getMemeImages}>Get a new meme image &nbsp; 🖼️</button>
            </form>

            <div className='meme'>
                <img src={meme.randomImage} alt='Meme Image' />
                <h2 className='txttop'>{meme.topTxt}</h2>
                <h2 className='txtbottom'>{meme.btmText}</h2>
            </div>
        </main>
    )
}