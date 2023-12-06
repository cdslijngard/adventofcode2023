import { importInputForDay } from './reader.js';

const day = 1;
const input = importInputForDay(day);

const first = (lines) => {
    let total = 0;
    for (let i = 0; i < lines.length; ++i) {
        let line = lines[i];
        let nums = [];
        for (let j = 0; j < line.length; ++j) {
            let char = line[j];
            if (!Number.isNaN(parseInt(char))) {
                nums.push(parseInt(char));
            }
        }
        total += parseInt(nums[0].toString() + nums[nums.length - 1].toString());
    }
    return total;
};

const second = (lines) => {
    const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const wordValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    let total = 0;

    for (let i = 0; i < lines.length; ++i) {
        let line = lines[i];
        let numsFound = [];
        let wordsFound = []

        for (let j = 0; j < line.length; ++j) {
            let char = line[j];
            if (!Number.isNaN(parseInt(char))) {
                numsFound.push({ value: parseInt(char), index: j });
            }
        }
        const leftDigitIndex = Math.min(...numsFound.map(n => n.index));
        const rightDigitIndex = Math.max(...numsFound.map(n => n.index));

        words.forEach(word => {
            const firstIndex = line.indexOf(word);
            const lastIndex = line.lastIndexOf(word);
            if (firstIndex > -1) {
                wordsFound.push({ value: word, index: firstIndex });
            }
            if (lastIndex > -1 && lastIndex != firstIndex) {
                wordsFound.push({ value: word, index: lastIndex });
            }
        })
        const leftWordIndex = Math.min(...wordsFound.map(x => x.index));
        const rightWordIndex = Math.max(...wordsFound.map(x => x.index));

        let left;
        if (leftDigitIndex < leftWordIndex) {
            left = numsFound.find(n => n.index == leftDigitIndex).value;
        } else {
            left = wordValues[words.indexOf(wordsFound.find(w => w.index == leftWordIndex).value)];
        }

        let right;
        if (rightDigitIndex > rightWordIndex) {
            right = numsFound.find(n => n.index == rightDigitIndex).value;
        } else {
            right = wordValues[words.indexOf(wordsFound.find(w => w.index == rightWordIndex).value)];
        }

        const toAdd = parseInt(left.toString() + right.toString());
        total += toAdd;

    }
    return total;
}

console.log('First example: ', first(input.exampleLines));
console.log('First: ', first(input.lines));

console.log('Second example: ', second(input.exampleLines));
console.log('Second: ', second(input.lines));