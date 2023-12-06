import { importInputForDay } from './reader.js';

const day = 2;
const input = importInputForDay(day);

const amounts = {
    "red": 12,
    "green": 13,
    "blue": 14
}

const first = (lines) => {
    let total = 0;

    for (let i = 0; i < lines.length; ++i) {
        const line = lines[i];
        const gameId = Number(line.split(':')[0].substring(5));
        const sets = line.split(':')[1].split(';');

        let count = true;

        for (let si = 0; si < sets.length; ++si) {
            const grabs = sets[si].split(',');

            for (let gi = 0; gi < grabs.length; ++gi) {
                const value = Number(grabs[gi].trim().split(' ')[0]);
                const color = grabs[gi].trim().split(' ')[1];

                if (value > amounts[color]) {
                    count = false;
                    // game is not possible because of this grab
                    // break because it is useless to keep looking at later grabs
                    break;
                }
            }

            if (!count) {
                // unnecessary to look at later sets because a grab in an earlier set was impossible
                break;
            }
        }

        if (count) {
            total += gameId;
        }
    }

    return total;
}

const second = (lines) => {
    let total = 0;

    for (let i = 0; i < lines.length; ++i) {
        const line = lines[i];
        const sets = line.split(':')[1].split(';');

        let minimums = { 'red': 0, 'green': 0, 'blue': 0 }

        for (let si = 0; si < sets.length; ++si) {
            const grabs = sets[si].split(',');

            for (let gi = 0; gi < grabs.length; ++gi) {
                const value = Number(grabs[gi].trim().split(' ')[0]);
                const color = grabs[gi].trim().split(' ')[1];

                if (value > minimums[color]) {
                    minimums[color] = value;
                }
            }
        }
        const power = minimums['red'] * minimums['blue'] * minimums['green'];
        total += power;
    }

    return total;
}

console.log('First (example): ' + first(input.exampleLines));
console.log('first: ' + first(input.lines));

console.log('Second (example): ' + second(input.exampleLines));
console.log('second: ' + second(input.lines));