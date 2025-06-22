export type Sound = 'a' | 'i' | 'o' | 'e' | 'u';

export type Word = {
    id: string;
    emoji: string;
    vowel: Sound;
};

/* short ă  */
const A: Word[] = [
    { id: 'cat',  emoji: '🐱', vowel: 'a' },
    { id: 'hat',  emoji: '🎩', vowel: 'a' },
    { id: 'bag',  emoji: '👜', vowel: 'a' },
    { id: 'bat',  emoji: '🦇', vowel: 'a' },
    { id: 'map',  emoji: '🗺️', vowel: 'a' },
];

/* short ĭ  */
const I: Word[] = [
    { id: 'pig',  emoji: '🐷', vowel: 'i' },
    { id: 'fish', emoji: '🐟', vowel: 'i' },
    { id: 'ship', emoji: '🚢', vowel: 'i' },
    { id: 'milk', emoji: '🥛', vowel: 'i' },
    { id: 'pin',  emoji: '📌', vowel: 'i' },
    { id: 'hill', emoji: '⛰️', vowel: 'i' },
];

/* short ŏ  */
const O: Word[] = [
    { id: 'dog',  emoji: '🐶', vowel: 'o' },
    { id: 'fox',  emoji: '🦊', vowel: 'o' },
    { id: 'mop',  emoji: '🧹', vowel: 'o' },
    { id: 'sock', emoji: '🧦', vowel: 'o' },
    { id: 'log',  emoji: '🪵', vowel: 'o' },
];

/* short ĕ  */
const E: Word[] = [
    { id: 'pen',  emoji: '🖊️', vowel: 'e' },
    { id: 'ten',  emoji: '🔟',  vowel: 'e' },
    { id: 'web',  emoji: '🕸️', vowel: 'e' },
    { id: 'bed',  emoji: '🛏️', vowel: 'e' },
];

/* short ŭ  */
const U: Word[] = [
    { id: 'cup',  emoji: '☕',  vowel: 'u' },
    { id: 'bus',  emoji: '🚌', vowel: 'u' },
    { id: 'sun',  emoji: '☀️', vowel: 'u' },
    { id: 'bug',  emoji: '🐞', vowel: 'u' },
    { id: 'nut',  emoji: '🥜', vowel: 'u' },
];

const BANK: Record<Sound, Word[]> = { a: A, i: I, o: O, e: E, u: U };

function sample<T>(arr: T[], n: number): T[] {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

/* → losuje 2 różne dźwięki + 3 słowa dla każdego */
export function getRound() {
    const sounds = sample(Object.keys(BANK) as Sound[], 2) as [Sound, Sound];
    const pool   = [...sample(BANK[sounds[0]], 3), ...sample(BANK[sounds[1]], 3)];
    return { sounds, pool };
}
