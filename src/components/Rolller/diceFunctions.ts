function rollDie(amount: number, dice: number) {
    if (isNaN(dice) || isNaN(amount)) return [];

    const rolls = [...Array<string>(amount).keys()].map(
        () => String(Math.ceil(Math.random() * dice))
    );

    return rolls;
}

function assureDice(amount: number, dice: number) {
    if (amount % 1 !== 0 || dice % 1 !== 0) {
        return {new_amount: +"", new_dice: +""}
    }
    
    let new_amount = amount
    let new_dice = dice

    if (amount > 100) {
        new_amount = 100;
    } else if (amount < 1) {
        new_amount = 1
    }

    if (dice > 9999) {
        new_dice = 9999
    } else if ( dice < 2) {
        new_dice = 2
    }

    return {new_amount, new_dice}
}

export function percentageDie(amount: number, dice: number, value: number) {
    const {new_amount, new_dice} = assureDice(amount, dice);

    const rolls: string[] = rollDie(new_amount, new_dice);
    
    let results: string[] = [];
    for (let roll of rolls) {
        switch (true) {
            case +roll <= Math.floor(value/5):
                results.push("Sucesso Extremo!");
            case +roll <= Math.floor(value/2):
                results.push("Sucesso Bom!");
            case +roll <= value:
                results.push("Sucesso Normal!");
            default:
                value? results.push("Falha!") : results.push("");
        };
    };

    return [rolls, results];
}

export function modifier(amount: number, dice: number, value: number) {
    const {new_amount, new_dice} = assureDice(amount, dice);

    const rolls: string[] = rollDie(new_amount, new_dice);

    let results: string[] = [];
    for (let roll of rolls) {
        results.push(String(+roll + value));
    };

    return [rolls, results];
}