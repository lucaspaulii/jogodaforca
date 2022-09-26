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
  let [gameStarted, setGameStarted] = useState(false);
  let [winGame, setWinGame] = useState(false);
  let [loseGame, setLoseGame] = useState(false);
  let [inputHandler, setInputHandler] = useState();

  function checkIfWordHasLetter(letter, word) {
    if (word) {
      const wordToCheck = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const wordArr = wordToCheck.split("");
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
      let wordToCheck = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      let wordToCheckArr = wordToCheck.split("");
      let newPalavraArr = wordToCheckArr.map((l, i) =>
        letrasCertas.includes(l) ? wordArr[i] : "_"
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
    setWinGame(false);
    setLoseGame(false);
  }
  function letterWasUsed(a) {
    if (letrasCertas.includes(a) || letrasErradas.includes(a)) {
      return true;
    }
    return false;
  }
  function gameLost() {
    if (imagem === forca6) {
      loseGame = true;
      setLoseGame(loseGame);
      onGameLoss();
    }
  }
  function onGameLoss() {
    palavraCodificada = palavra.toUpperCase();
    setPalavraCodificada(palavraCodificada);
  }
  function startGame() {
    gameStarted = true;
    setGameStarted(gameStarted);
  }
  function gameWon() {
    let finalArr = palavraCodificada.split(" ");
    let finalWord = finalArr.join("");
    if (finalWord === palavra) {
      palavraCodificada = palavra.toUpperCase();
      setPalavraCodificada(palavraCodificada);
      winGame = true;
      setWinGame(winGame);
    }
  }
  function handleGuess() {
    if (palavra) {
      const inputToCheck = inputHandler
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const palavraToCheck = palavra
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      if (inputToCheck === palavraToCheck) {
        palavraCodificada = palavra.toUpperCase();
        setPalavraCodificada(palavraCodificada);
        winGame = true;
        setWinGame(winGame);
      } else {
        letrasErradas = [...letrasErradas, inputHandler];
        setLetrasErradas(letrasErradas);
        imagem = forca6;
        setImagem(imagem);
        gameLost();
      }
    }
    setInputHandler("");
  }
  return (
    <div className="content">
      <div className="header">Jogo da Forca!</div>
      <div className="imgContainer">
        <img src={imagem} alt="forca 0" data-identifier="game-image" />
        <div className="wordContainer">
          <button
            data-identifier="choose-word"
            onClick={() => {
              clearGame();
              randomWordGenerator();
              startGame();
            }}
          >
            Escolher Palavra
          </button>
          <div className="finalWord">
            <h1
              className={winGame ? "green" : loseGame ? "red" : ""}
              data-identifier="word"
            >
              {palavraCodificada}
            </h1>
            {winGame ? (
              <img
                src="https://images.squarespace-cdn.com/content/v1/5b0a1425d274cbde7c3c941f/1551408776853-YVODTGJ1KL4R0X5VJK0C/Bucket-Trophy.gif?format=300w"
                alt="winner image"
              />
            ) : loseGame ? (
              <img
                src="https://img.devrant.com/devrant/rant/r_72964_MB8Vw.gif"
                alt="loser image"
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <ul className="letters">
        {alfabeto.map((a, i) => (
          <li key={i}>
            <button
              data-identifier="letter"
              onClick={() => {
                checkIfWordHasLetter(a, palavra);
                gameWon();
                gameLost();
              }}
              className={changeLetterColor(a)}
              disabled={letterWasUsed(a) || winGame || loseGame || !gameStarted}
            >
              {a.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
      <div className="inputGuess">
        <p>Ja sei a palavra!</p>
        <input
          data-identifier="type-guess"
          onChange={(e) => setInputHandler(e.target.value)}
          value={inputHandler}
          disabled={winGame || loseGame || !gameStarted}
        ></input>
        <button
          data-identifier="guess-button"
          onClick={() => handleGuess()}
          disabled={winGame || loseGame || !gameStarted}
        >
          Chutar
        </button>
      </div>
    </div>
  );
}
