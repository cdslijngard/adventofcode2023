import { readFileSync } from 'fs';

export function importInputForDay(day) {
    const file = readFileSync(`${day}.txt`, 'utf8');
    const lines = file.split(/\r?\n/);
    const exampleFile = readFileSync(`${day}example.txt`, 'utf8');
    const exampleLines = exampleFile.split(/\r?\n/);

    return {
        exampleLines: exampleLines, lines: lines
    }
}