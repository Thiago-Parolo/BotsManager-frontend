import { createContext, ReactNode, useState } from "react";

type audioType = {
    audio: {
        id: number
        url: string,
        name: string,
    }
    setAudio: React.Dispatch<React.SetStateAction<{
        id: number;
        url: string;
        name: string;
    }>>
};

type AudioProvider = {
    children: ReactNode;
}

export const AudioContext = createContext({} as audioType);

export function AudioProvider(props: AudioProvider) {
    const [audio, setAudio] = useState({
        id: 0,
        url: "",
        name: ""
    })

    return (
        <AudioContext.Provider value={{audio, setAudio}}>
            {props.children}
        </AudioContext.Provider>
    )
}