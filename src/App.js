import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

const options = {
  method: "GET",
  url: "https://quotes15.p.rapidapi.com/quotes/random/",
  headers: {
    "X-RapidAPI-Key": "f6ba3f5716mshfd6bfcfc367b473p11ce1djsnfe065a3afebc",
    "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
  },
};

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  // Fetch a random quote when the component mounts
  useEffect(() => {
    // Fetch the quote and set it using setQuote()
    getRandomQuote();
  }, []);

  const handleNewQuote = () => {
    getRandomQuote();
  };

  const handleShareTwitter = () => {
    // Create a tweet link with the quote text and open it in a new window
    const text = encodeURIComponent("Check out this awesome quote I found on Quotely: "+ + quote);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(tweetUrl, "_blank");
  };

  const handleDownload = async () => {
    // Use html-to-image to create an image and download it
    const node = document.getElementById("quote-container");
    const image = await htmlToImage.toPng(node, {
      backgroundColor:"#fed6e3",
      width:1920,
      height:1080,
      style:{"margin-top":"500px","left":"50%", "fontSize":"2.5em"}
    });
    const a = document.createElement("a");
    a.href = image;
    a.download = "quote.png";
    a.click();
  };

  const getRandomQuote = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setQuote(response.data.content);
      setAuthor(response.data.originator.name);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container position-absolute top-50 start-50 translate-middle">
        <h1>Quotely - a quotes generator</h1>
          <div className="quote-container" id="quote-container">
            <p><blockquote>"{quote}"</blockquote></p>
          </div>
          <h6>- {author}</h6>
          <button className="links" onClick={handleNewQuote}>New Quote</button>
          <button className="links" onClick={handleShareTwitter}>Share on Twitter</button>
          <button className="links" onClick={handleDownload}>Download Quote Image</button>
        </div>
      </header>
    </div>
  );
}

export default App;
