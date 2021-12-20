import { useEffect, useContext, useState } from "react";
import styles from "./styles.module.scss";
import { io } from "socket.io-client";

import { RollContext } from "../../contexts/rolls";
import { api } from "../../services/api";

type rollType = {
    id?: number,
    faces?: string,
    amount?: string,
    thrownBy: string,
    result: string,
    success: string,
    thrownAt: string
}

const socket = io("http://localhost:3333");

let rollsQueue: rollType[] = [];

socket.on("update_throws", (newRoll: rollType) => {
    const roll: rollType = {
            thrownBy: newRoll.thrownBy,
            result: newRoll.result,
            success: newRoll.success,
            thrownAt: newRoll.thrownAt
        };

    rollsQueue.push(roll)
})

export function RollsHistory() {
    const { roll, setRoll } = useContext(RollContext);
    const [ rolls, setRolls ] = useState<rollType[]>([]);

    useEffect(() => {
        const rolls = JSON.parse(localStorage.getItem("rolls") as string);

        setRolls(rolls)
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (rollsQueue.length > 0) {
                setRoll(rollsQueue[0])
                rollsQueue.shift();
            }
        }, 100);

        return () => { clearInterval(intervalId) }
    }, []);

    useEffect(() => {
        if (roll.result === "") {
            return
        }

        setRolls(prevState => [
            roll,
            ...prevState
        ])
        
        localStorage.setItem("rolls", JSON.stringify([roll, ...rolls]))
    }, [roll]);

    return (
        <div className={styles.rollsHistoryWrapper}>
            {rolls.map((roll, index) => (
                <div className={styles.roll} key={index}>
                    <p>{roll.thrownBy}</p>
                    <p>{roll.result}</p>
                    <p>{roll.success}</p>
                    <p>{roll.thrownAt}</p>
                </div>
            ))}
        </div>
    )
}