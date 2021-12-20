import { FormEvent, useContext } from "react";
import styles from "./styles.module.scss";

import { api } from "../../services/api";
import { ConnectContext } from "../../contexts/connect";

export function ConnectButton() {
    const { server, channel } = useContext(ConnectContext);

    function handleConnect(e: FormEvent) {
        e.preventDefault();

        api.post("/connect", { server, channel })
    }

    return (
        <form onSubmit={handleConnect} className={styles.buttonWrapper}>
            <button type="submit">CONECTAR</button>
        </form>
    )
}