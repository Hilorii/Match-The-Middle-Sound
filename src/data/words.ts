export type Word = {
    id: string;
    emoji: string;
    vowel: 'a' | 'i';
};

export const words: Word[] = [
    { id: 'cat',  emoji: '🐱', vowel: 'a' }, // /ă/
    { id: 'hat',  emoji: '🎩', vowel: 'a' },
    { id: 'pig',  emoji: '🐷', vowel: 'i' }, // /ĭ/
    { id: 'fish', emoji: '🐟', vowel: 'i' },
    { id: 'bag',  emoji: '👜', vowel: 'a' },
    { id: 'ship', emoji: '🚢', vowel: 'i' },
];
