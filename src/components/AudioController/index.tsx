import { FormEvent, useContext, useState } from "react";

import { AudioContext } from "../../contexts/audios";
import { ConnectContext } from "../../contexts/connect";
import { api } from "../../services/api";
import { VolumeRange } from "../VolumeRange";
import styles from "./styles.module.scss"

export function AudioController() {
    const { setAudio } = useContext(AudioContext);
    const { server } = useContext(ConnectContext);

    async function handleAdd() {
        const URL = document.getElementById("urlInput") as HTMLInputElement;

        if (!URL.value) {
            return
        }

        const response = await api.post("audio", {
            url: URL.value
        })

        setAudio({
            id: response.data.id,
            url: response.data.url,
            name: response.data.name
        })
    }

    async function handlePlay() {
        const URL = document.getElementById("urlInput") as HTMLInputElement;

        if (!URL.value) {
            return;
        };

        await api.put("play", {
            url: URL.value,
            server
        });
    }

    async function handlePause() {
        await api.put("pause");
    }

    async function handleResume() {
        await api.put("resume");
    }

    return (
        <div className={styles.audioControllerWrapper}>
            <div>
                <label>URL</label>
                <input id="urlInput"/>
            </div>
            <div>
                <button onClick={handlePause}>pausa</button>
                <button onClick={handleResume}>resumo</button>
                <VolumeRange />
            </div>
            <div className={styles.actionDiv}>
                <button onClick={handlePlay}>TOCAR</button>
                <button onClick={handleAdd}>ADICIONAR</button>
            </div>
        </div>
    )
}