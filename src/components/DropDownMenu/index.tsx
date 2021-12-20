import { FormEvent, useContext, useState, useEffect } from "react";

import { ConnectContext } from "../../contexts/connect";
import { RollContext } from "../../contexts/rolls";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

type propsType = {
    options: string[],
    title: string,
    action: string
}

export function DropDownMenu({ options = [], title, action }: propsType) {
    const { server, channels, channel, setServer, setChannels, setChannel } = useContext(ConnectContext);
    const { system, setSystem } = useContext(RollContext);
    const [value, setValue] = useState("");

    useEffect(() => {
        switch (action) {
            case "system":
                setValue(system);
                api.put("system", {system});
                break;
            case "server":
                setValue(`${server}`);
                api.put("server", {server}).then(response => {
                    setChannels(response.data)
                });
                break;
            case "channel":
                setValue(`${channel}`);
                api.put("channel", {channel});
                break;
        }
    }, [system, server, channel])

    function handleChange(e: FormEvent) {
        const target = e.target as HTMLSelectElement

        switch (action) {
            case "system":
                localStorage.setItem("system", target.value);
                setSystem(target.value);
                break;
            case "server":
                localStorage.setItem("server", target.value);
                setServer(target.value);
                break;
            case "channel":
                localStorage.setItem("channel", target.value);
                setChannel(target.value);
                break;
        };
    };

    return (
        <div className={styles.dropDownMenuWrapper}>
            <p>{title}</p>
            <select className={styles.select} value={value} onChange={handleChange}>
                {options.length ?
                options.map((option, index) => (
                    <option value={option} key={index}>{option}</option>
                ))
                :
                channels.map((option, index) => (
                    <option value={option} key={index}>{option}</option>
                ))}
            </select>
        </div>
    )
}