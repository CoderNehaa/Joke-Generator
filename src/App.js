import "./styles.css";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";

export default function App() {
  const[english, setEnglish] = useState(true);
  const[joke, setJoke] = useState("");

 const getJokeUrl = () => {
    if (english) {
      return "https://api.chucknorris.io/jokes/random?category=dev";
    } else {
      return "https://hindi-jokes-api.onrender.com/jokes?api_key=4e5b0199951c176b01d4bbd35a24";
    }
  };
  
  // Use the custom hook here
  const { data, loading, error, refetch: newJoke } = useFetch(getJokeUrl());

  useEffect(() => {
    if(data){
      if(english){
        setJoke(data.value);
      } else {
        setJoke(data.jokeContent);
      }
    }
  },[data, english]);

  // Display something went wrong here
  if (error) return <p> Something went wrong</p>;

  function handleJokeLanguage(){
    setEnglish(!english);
  }
  
  return (
    <div className="App">
      <div className="jokesLang" onClick={handleJokeLanguage}>
        {english?"Get Hindi jokes here>>>":"Get English jokes here>>>"}
      </div>
      
      <br/>
     
      <h1>Joke Generator</h1>
      <img src="data:image/jpeg;base64,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"/>
     
      <h2>{loading? "Loading..." :joke}</h2>
      <button onClick={newJoke} className="btn"> New Joke </button>
    </div>
  );
}
