import { createContext, ReactNode, useState } from "react";

type rollType = {
    roll: {
        thrownBy: string,
        result: string,
        success: string,
        thrownAt: string,
    },
    system: string,
    setRoll: React.Dispatch<React.SetStateAction<{
        thrownBy: string;
        result: string;
        success: string;
        thrownAt: string;
    }>>,
    setSystem: React.Dispatch<React.SetStateAction<string>>
};

type RollProvider = {
    children: ReactNode;
}

export const RollContext = createContext({} as rollType);

export function RollProvider(props: RollProvider) {
    const sessionSystem = !!localStorage.getItem("system") ? localStorage.getItem("system") : "Porcentagem"

    const [roll, setRoll] = useState({
        thrownBy: "",
        result: "",
        success: "",
        thrownAt: ""
    })
    const [system, setSystem] = useState(`${sessionSystem}`);

    return (
        <RollContext.Provider value={{roll, system, setRoll, setSystem}}>
            {props.children}
        </RollContext.Provider>
    )
}