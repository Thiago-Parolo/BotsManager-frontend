import { FormEvent, useState, useContext } from "react";
import styles from "./styles.module.scss";

import { RollContext } from "../../contexts/rolls";
import { percentageDie, modifier } from "./diceFunctions";
import { DropDownMenu } from "../DropDownMenu";
import { api } from "../../services/api";

type dieFunction = {
    amount: number,
    dice: number,
    value: number
}

export function Roller() {
    const [amount, setAmount] = useState("");
    const [dice, setDice] = useState("");
    const [value, setValue] = useState("");
    const { system, setRoll } = useContext(RollContext);

    function getDate() {
        const dateObject = new Date();

        const day = dateObject.getDate();
        const month = dateObject.getMonth();
        const hour = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        
        const fullDate = `${day}/${month} || ${hour}:${minutes}`;

        return fullDate
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!amount.length || !dice.length) {
            return;
        };
        
        var diesResult: string[][] = []
        switch (system) {
            case "Porcentagem":
                diesResult = percentageDie(+amount, +dice, +value);
                break;
            case "Modificador":
                diesResult = modifier(+amount, +dice, +value);
                break;
        }
        
        api.post("throw", {
            amount,
            faces: dice,
            thrownBy: "Interface",
            results: diesResult[0],
            success: diesResult[1],
            thrownAt: getDate()
        });

        diesResult[0].forEach((_, i) => {
            setTimeout(() => {
                setRoll({
                    thrownBy: "Interface",
                    result: diesResult[0][i],
                    success: diesResult[1][i],
                    thrownAt: getDate()
                })
            }, 10)
        })
    }

    return (
        <form className={styles.rollerWrapper} onSubmit={handleSubmit}>
            <DropDownMenu title="SISTEMA" options={["Porcentagem", "Modificador"]} action="system" />
            <div className={styles.inputWrapper}>
                <label>QUANTIDADE</label>
                <input onChange={event => setAmount(event.target.value)} value={amount} placeholder="..." />
            </div>
            <div className={styles.inputWrapper}>
                <label>LADOS</label>
                <input onChange={event => setDice(event.target.value)} value={dice} placeholder="..." />
            </div>
            <div className={styles.inputWrapper}>
                <label>VALOR</label>
                <input onChange={event => setValue(event.target.value)} value={value} placeholder="..." />
            </div>
            <div className={styles.buttonWrapper}>
                <button type="submit">ROLAR</button>
            </div>
        </form>
    )
}