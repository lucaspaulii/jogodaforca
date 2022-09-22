import forca0 from "../images/forca0.png";
import forca1 from "../images/forca1.png";
import forca2 from "../images/forca2.png";
import forca3 from "../images/forca3.png";
import forca4 from "../images/forca4.png";
import forca5 from "../images/forca5.png";
import forca6 from "../images/forca6.png";
import palavras from "./palavras";
import React, { useState } from "react";

export default function App() {
  const images = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];
  const alfabeto = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let [palavra, setPalavra] = useState();
  let [letrasCertas, setLetrasCertas] = useState([]);
  let [letrasErradas, setLetrasErradas] = useState([]);
  let [palavraCodificada, setPalavraCodificada] = useState();
  let [imagem, setImagem] = useState(forca0);

  function checkIfWordHasLetter(letter, word) {
    if (word) {
      const wordArr = word.split("");
      if (wordArr.includes(letter)) {
        letrasCertas = [...letrasCertas, letter];
        setLetrasCertas(letrasCertas);
        displayLetter(letter, word);
      } else {
        letrasErradas = [...letrasErradas, letter];
        setLetrasErradas(letrasErradas);
        imagem = images[letrasErradas.length];
        setImagem(imagem);
      }
    }
  }
  function changeLetterColor(a) {
    if (letrasCertas.includes(a)) {
      return "correctLetter";
    } else if (letrasErradas.includes(a)) {
      return "incorrectLetter";
    }
  }
  function randomWordGenerator() {
    palavra = palavras[Math.floor(Math.random() * (palavras.length - 1))];
    setPalavra(palavra);
    displayWord(palavra);
  }
  function displayWord(word) {
    if (word) {
      const wordArr = word.split("");
      let newDisplayArr = wordArr.map((a) => "_");
      setPalavraCodificada(newDisplayArr.join(" "));
    }
  }
  function displayLetter(a, word) {
    if (word) {
      let wordArr = word.split("");
      let newPalavraArr = wordArr.map((l) =>
        letrasCertas.includes(l) ? l : "_"
      );
      palavraCodificada = newPalavraArr.join(" ");
      setPalavraCodificada(palavraCodificada);
    }
  }
  function clearGame() {
    setLetrasCertas([]);
    setLetrasErradas([]);
    setPalavraCodificada("");
    setImagem(forca0);
  }
  function letterWasUsed(a) {
    if (letrasCertas.includes(a) || letrasErradas.includes(a)) {
      return true;
    }
    return false;
  }
  function gameLost() {
    if (imagem === forca6) {
        return true
    } else {return false}
  }
  function onGameLoss() {
    if (gameLost() === true) {
        palavraCodificada = palavra;
        setPalavraCodificada(palavraCodificada);
    }
  }

  return (
    <div className="content">
      <div className="imgContainer">
        <img src={imagem} alt="forca 0" />
        <div className="wordContainer">
          <button
            onClick={() => {
              clearGame();
              randomWordGenerator();
            }}
          >
            Escolher Palavra
          </button>
          <h1 className={gameLost() ? 'red' : ''}>{palavraCodificada}</h1>
        </div>
      </div>
      <ul className="letters">
        {alfabeto.map((a, i) => (
          <li key={i}>
            <button
              onClick={() => {
                checkIfWordHasLetter(a, palavra)
                onGameLoss()
            }}
              className={changeLetterColor(a)}
              disabled={letterWasUsed(a) || gameLost()}
            >
              {a.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
      <div className="inputGuess">
        <p>Ja sei a palavra!</p>
        <input></input>
        <button>Chutar</button>
      </div>
    </div>
  );
}
