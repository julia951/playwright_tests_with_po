function randomChoiceItems(numberItems) {
    const result = [];
    
    for (let i = 0; result.length < 2; i++) {
        const randomNum = Math.floor(Math.random() * numberItems);

        if (!result.includes(randomNum)) {
            result.push(randomNum);
        }
    }

    return result;
}
module.exports = { randomChoiceItems };