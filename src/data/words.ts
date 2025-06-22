export type Word = {
    id: string;
    emoji: string;
    vowel: 'a' | 'i';
};

const aWords: Word[] = [
    { id: 'cat',  emoji: '🐱', vowel: 'a' },
    { id: 'hat',  emoji: '🎩', vowel: 'a' },
    { id: 'bag',  emoji: '👜', vowel: 'a' },
    { id: 'bat',  emoji: '🦇', vowel: 'a' },
    { id: 'map',  emoji: '🗺️', vowel: 'a' },
    { id: 'cap',  emoji: '🧢', vowel: 'a' },
];

const iWords: Word[] = [
    { id: 'pig',  emoji: '🐷', vowel: 'i' },
    { id: 'fish', emoji: '🐟', vowel: 'i' },
    { id: 'ship', emoji: '🚢', vowel: 'i' },
    { id: 'lid',  emoji: '🫙', vowel: 'i' },
    { id: 'hill', emoji: '⛰️', vowel: 'i' },
    { id: 'milk', emoji: '🥛', vowel: 'i' },
    { id: 'pin',  emoji: '📌', vowel: 'i' },
];

function sample<T>(arr: T[], n: number): T[] {
    return [...arr]
        .sort(() => Math.random() - 0.5)
        .slice(0, n);
}

export function getRandomWords(): Word[] {
    return [...sample(aWords, 3), ...sample(iWords, 3)];
}
