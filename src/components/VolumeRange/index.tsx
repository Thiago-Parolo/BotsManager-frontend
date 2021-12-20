import { FormEvent, useEffect, useState } from "react";
import { api } from "../../services/api";
import styles from "./styles.module.scss"

export function VolumeRange() {
    const sessionVolume = sessionStorage.getItem("volume")
    const [volume, setVolume] = useState(sessionVolume ? sessionVolume : ".5");

    useEffect(() => {
        const foreground = document.getElementById("foreground") as HTMLDivElement;

        foreground.style.width = `${+volume * 100}%`
    }, []);

    function handleVolume() {
        const input = document.getElementById("volumeInput") as HTMLInputElement
        const foreground = document.getElementById("foreground") as HTMLDivElement;

        api.put("volume", {
            volume: input.value
        });

        setVolume(input.value)
        sessionStorage.setItem("volume", input.value)
        foreground.style.width = `${+input.value * 100}%`
    }

    function changeVolume(e: FormEvent) {
        const target = e.target as HTMLButtonElement;
        const input = document.getElementById("volumeInput") as HTMLInputElement;
        
        if (target.id === "plus") {
            input.stepUp();
            handleVolume();
            return;
        }

        input.stepDown();
        handleVolume();
    }
    
    return (
        <span className={styles.volumeRangeWrapper}>
            <button id="minus" onClick={changeVolume} className={styles.volumeButton}>-</button>
            <span className={styles.track}>
                <div id="background" className={styles.volumeBackground}></div>
                <div id="foreground" className={styles.volumeForeground}></div>
                <input id="volumeInput" type="range" defaultValue={volume} onChange={handleVolume} min="0" max="1" step="0.01"/>
            </span>
            <button id="plus" onClick={changeVolume} className={styles.volumeButton}>+</button>
        </span>
    )
}