import React from "react";

export default function Meme() {
    const [formData, setformData] = React.useState({

        topText: "",
        bottomText: "",
        imageUrl: "http://i.imgflip.com/1bij.jpg"

    })

    function handleClick(event) {

        const { name, value } = event.target


        setformData(prevForm => ({
            ...prevForm,
            [name]: value

        }))



    }

    const [memeData, setmemeData] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setmemeData(data.data.memes)
            })



    }, [])





    function getMemeImages() {


        let randomNumber = Math.floor(Math.random() * memeData.length)
        let url = memeData[randomNumber].url
        setformData(prevForm => ({

            ...prevForm,
            imageUrl: url

        }))

    }

    return (

        <main>
            <div className="form">
                <input className="form-input"
                    placeholder="top text"
                    onChange={handleClick}
                    name="topText"
                    value={formData.topText}

                />
                <input className="form-input"
                    placeholder="bottom-text"
                    onChange={handleClick}
                    name="bottomText"
                    value={formData.bottomText}
                />
                <button className="form-button" onClick={getMemeImages}>   Get a new meme image 🖼</button>
            </div>
            <div id="meme">

                <h1 className="meme-text topText">{formData.topText}</h1>


                <div className="meme"><img src={formData.imageUrl} alt="meme" className="memeImage" /></div>

                <h1 className="meme-text bottomText">{formData.bottomText}</h1>
            </div>

        </main>

    )


}