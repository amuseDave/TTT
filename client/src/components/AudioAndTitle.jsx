import { getRandomItem } from "../utils";
import thirdNeon from "../assets/thirdNeon.mp3";
import fourthNeon from "../assets/thirdNeon.mp3";
import { useEffect, useRef } from "react";

export let audioRef = null;
export let audioTitleRef = null;

export default function AudioAndTitle() {
  const ticRef = useRef();
  const tacRef = useRef();
  const toeRef = useRef();

  // Initiallize audio and set intervals to manipulate effects
  useEffect(() => {
    async function setAudio() {
      audioTitleRef = new Audio(thirdNeon);
      audioTitleRef.volume = 0.3;
      audioRef = new Audio(fourthNeon);

      window.removeEventListener("click", setAudio);
      window.removeEventListener("resize", setAudio);
    }
    window.addEventListener("resize", setAudio);
    window.addEventListener("click", setAudio);

    const opRs = [0.2, 0.5, 0.8, 1];

    function triggerNeonEffect() {
      if (audioTitleRef) {
        audioTitleRef.pause();
        audioTitleRef.currentTime = 0;
        audioTitleRef.play();
      }

      ticRef.current.style.opacity = getRandomItem(opRs);
      tacRef.current.style.opacity = getRandomItem(opRs);
      toeRef.current.style.opacity = getRandomItem(opRs);
    }
    triggerNeonEffect();

    let timeoutID;
    setInterval(() => {
      if (timeoutID) return;
      timeoutID = setTimeout(() => {
        triggerNeonEffect();
        timeoutID = null;
      }, Math.floor(Math.random() * 3000));
    }, 2000);
  }, []);

  return (
    <h1 className="title">
      <span ref={ticRef}>Tic</span>
      <span ref={tacRef}>Tac</span>
      <span ref={toeRef}>Toe</span>
    </h1>
  );
}
