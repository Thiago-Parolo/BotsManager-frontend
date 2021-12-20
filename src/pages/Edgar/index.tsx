import { Roller } from "../../components/Rolller"
import { RollsHistory } from "../../components/RollsHistory"
import { Switch } from "../../components/Switch"
import { RollProvider } from "../../contexts/rolls"

export function Edgar() {
    return (
        <div className="botWrapper">
            <Switch bot="Edgar" pronoun="o"/>
            <RollProvider>
                <Roller />
                <RollsHistory />
            </RollProvider>
        </div>
    )
}