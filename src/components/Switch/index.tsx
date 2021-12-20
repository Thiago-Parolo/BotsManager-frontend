import { useState, FormEvent, useEffect } from "react"
import { api } from "../../services/api";
import styles from "./styles.module.scss"

type switchProps = {
    bot: string,
    pronoun: string
}

export function Switch({ bot, pronoun }: switchProps) {
    const [state, setState] = useState(false);

    useEffect(() => {
        const input = document.getElementById(bot) as HTMLInputElement;
        const sessionState = sessionStorage.getItem(`${bot}State`);

        input.checked = sessionState == "true";

        setState(sessionState == "true")
    }, []);

    function changeState(e: FormEvent) {
        const input = e.target as HTMLInputElement;

        api.put("bot", { state: input.checked, bot });

        sessionStorage.setItem(`${bot}State`, `${input.checked}`);
        setState(input.checked);
    }

    return (
        <div className={styles.switchWrapper}>
            <label htmlFor={bot}>{bot} está {state ? `ligad${pronoun}` : `desligad${pronoun}`}</label>
            <>
                <label className={styles.switch}>
                    <input onInput={changeState} id={bot} type="checkbox" />
                    <span></span>
                </label>
            </>
        </div>
    )
}