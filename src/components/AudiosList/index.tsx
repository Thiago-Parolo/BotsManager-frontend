import { FormEvent, useContext, useEffect, useState } from "react"

import { api } from "../../services/api";
import styles from "./styles.module.scss"
import { AudioContext } from "../../contexts/audios";
import { ConnectContext } from "../../contexts/connect";

type audioType = {
    id: number
    url: string,
    name: string
}

export function AudiosList() {
    const { audio } = useContext(AudioContext);
    const { server } = useContext(ConnectContext);

    const [audios, setAudios] = useState(Array<audioType>());

    useEffect(() => {
        const audios = JSON.parse(localStorage.getItem("audios") as string);

        setAudios(audios)
    }, []);

    useEffect(() => {
        if (audio.id === 0) {
            return
        }

        setAudios(prevState => [
            ...prevState,
            audio
        ]);

        localStorage.setItem("audios", JSON.stringify([...audios, audio]))
    }, [audio]);

    function handleDelete(e: FormEvent) {
        e.preventDefault();
        const target = e.target as HTMLButtonElement;

        const data: audioType = {
            id: +target.id,
            url: "",
            name: ""
        }

        api.delete("audio", {data})

        setAudios(audios.filter(audio => audio.id !== +target.id))
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const target = e.target as HTMLButtonElement;

        await api.put("play", {
            url: target.id,
            server
        })
    }

    return (
        <div className={styles.audiosListWrapper}>
            {audios.map((audio) => (
                <form id={audio.url} onSubmit={handleSubmit} className={styles.audio} key={audio.id}>
                    <span>
                        <a href={audio.url} target="_blank">{audio.name}</a>
                    </span>
                    <button type="submit">TOCAR</button>
                    <button onClick={handleDelete} className={styles.deleteButton} id={String(audio.id)}>D</button>
                </form>
            ))}
        </div>
    )
}