import { Switch } from "../../components/Switch";
import { DropDownMenu } from "../../components/DropDownMenu";
import styles from "./styles.module.scss";
import { ConnectButton } from "../../components/ConnectButton";
import { ConnectProvider } from "../../contexts/connect";
import { AudioController } from "../../components/AudioController";
import { AudiosList } from "../../components/AudiosList";
import { AudioProvider } from "../../contexts/audios";

export function Ibuki() {
    return (
        <div className="botWrapper">
            <Switch bot="Ibuki" pronoun="a"/>
            <ConnectProvider>
                <span className={styles.menusWrapper}>
                    <DropDownMenu title="SERVIDOR" options={["Call do Mine e Niilismo³", "Legend of Lost Sins"]} action="server"/>
                    <DropDownMenu title="CANAL" options={[]} action="channel"/>
                    <ConnectButton />
                </span>
                <AudioProvider>
                    <AudioController />
                    <AudiosList />
                </AudioProvider>
            </ConnectProvider>
        </div>
    )
}