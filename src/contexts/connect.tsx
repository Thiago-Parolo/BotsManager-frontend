import { createContext, ReactNode, useState } from "react";

type connectType = {
    server: string,
    channels: string[],
    channel: string,
    setServer: React.Dispatch<React.SetStateAction<string>>,
    setChannels: React.Dispatch<React.SetStateAction<string[]>>,
    setChannel: React.Dispatch<React.SetStateAction<string>>
};

type ConnectProvider = {
    children: ReactNode;
}

export const ConnectContext = createContext({} as connectType);

export function ConnectProvider(props: ConnectProvider) {
    const sessionServer = !!localStorage.getItem("server") ? localStorage.getItem("server") : "Call do Mine"

    const [server, setServer] = useState(`${sessionServer}`);
    const [channels, setChannels] = useState([""]);
    const [channel, setChannel] = useState(`${localStorage.getItem("channel")}`);

    return (
        <ConnectContext.Provider value={{server , channels, channel, setServer, setChannels, setChannel}}>
            {props.children}
        </ConnectContext.Provider>
    )
}