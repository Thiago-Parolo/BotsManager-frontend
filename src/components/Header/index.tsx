import { MouseEvent, useContext, useEffect } from "react";
import { BotContext } from "../../contexts/bot";
import { api } from "../../services/api";

import styles from "./styles.module.scss";

export function Header() {
    const { name, setName } = useContext(BotContext);

    useEffect(() => {
        api.get("audio").then(response => {
            localStorage.setItem("audios", JSON.stringify(response.data))
        });

        api.get("throw").then(response => {
            localStorage.setItem("rolls", JSON.stringify(response.data))
        })
    }, []);

    function changeWindow(e: MouseEvent) {
        e.preventDefault();
        const a = e.target as HTMLAnchorElement;

        if (name === a.pathname) {
            return;
        }

        setName(a.pathname);
    }

    return (
        <header className={styles.headerWrapper}>
            <a
                href="arnitem"
                onClick={changeWindow}
                className={name === "/arnitem" ? styles.arnitemSelected : styles.arnitemButton}
            >ARNITEM</a>
            <a
                href="edgar"
                onClick={changeWindow}
                className={name === "/edgar" ? styles.edgarSelected : styles.edgarButton}
            >EDGAR</a>
            <a
                href="ibuki"
                onClick={changeWindow}
                className={name === "/ibuki" ? styles.ibukiSelected : styles.ibukiButton}
            >IBUKI</a>
        </header>
    )
}