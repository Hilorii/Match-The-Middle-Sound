export type Sound = 'a' | 'i' | 'o' | 'e' | 'u';

export type Word = {
    id: string;
    emoji: string;
    vowel: Sound;
};

/* ă  */
const A: Word[] = [
    { id: 'cat',  emoji: '🐱', vowel: 'a' },
    { id: 'hat',  emoji: '🎩', vowel: 'a' },
    { id: 'bag',  emoji: '👜', vowel: 'a' },
    { id: 'bat',  emoji: '🦇', vowel: 'a' },
    { id: 'map',  emoji: '🗺️', vowel: 'a' },
];

/* ĭ  */
const I: Word[] = [
    { id: 'pig',  emoji: '🐷', vowel: 'i' },
    { id: 'fish', emoji: '🐟', vowel: 'i' },
    { id: 'ship', emoji: '🚢', vowel: 'i' },
    { id: 'milk', emoji: '🥛', vowel: 'i' },
    { id: 'pin',  emoji: '📌', vowel: 'i' },
    { id: 'hill', emoji: '⛰️', vowel: 'i' },
];

/* ŏ  */
const O: Word[] = [
    { id: 'dog',  emoji: '🐶', vowel: 'o' },
    { id: 'fox',  emoji: '🦊', vowel: 'o' },
    { id: 'mop',  emoji: '🧹', vowel: 'o' },
    { id: 'sock', emoji: '🧦', vowel: 'o' },
    { id: 'log',  emoji: '🪵', vowel: 'o' },
];

/* ĕ  */
const E: Word[] = [
    { id: 'pen',  emoji: '🖊️', vowel: 'e' },
    { id: 'ten',  emoji: '🔟',  vowel: 'e' },
    { id: 'web',  emoji: '🕸️', vowel: 'e' },
    { id: 'bed',  emoji: '🛏️', vowel: 'e' },
];

/* ŭ  */
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

export function getRound() {
    const sounds = sample(Object.keys(BANK) as Sound[], 2) as [Sound, Sound];

    const k  = Math.floor(Math.random() * 5) + 1;     // 1…5 kart dla 1-go dźwięku
    const k2 = 6 - k;                                 // reszta dla 2-go

    const pool = [
        ...sample(BANK[sounds[0]], k),
        ...sample(BANK[sounds[1]], k2),
    ].sort(() => Math.random() - 0.5);

    return { sounds, pool };
}
