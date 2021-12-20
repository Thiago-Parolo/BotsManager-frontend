import { createContext, ReactNode, useState } from "react";

type botType = {
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>
};

type BotProvider = {
    children: ReactNode;
}

export const BotContext = createContext({} as botType);

export function BotProvider(props: BotProvider) {
    const [name, setName] = useState("")

    return (
        <BotContext.Provider value={{name, setName}}>
            {props.children}
        </BotContext.Provider>
    )
}