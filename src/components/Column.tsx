import { useDroppable } from '@dnd-kit/core';
import Card from './Card';
import type { Word } from '../data/words';

type Props = {
    id: 'a' | 'i';
    label: string;
    words: Word[];
};

export default function Column({ id, label, words }: Props) {
    const { setNodeRef, isOver } = useDroppable({ id });

    /* TTS po tapnięciu w nagłówek */
    const speak = () => {
        const utter = new SpeechSynthesisUtterance(label === 'ă' ? 'a' : 'i');
        utter.lang = 'en-US';
        utter.rate = 0.8;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
    };

    return (
        <div
            ref={setNodeRef}
            className={`column ${isOver ? 'drag-over' : ''}`}
        >
            <h3 onClick={speak} role="button" aria-label={`hear ${label}`}>
                /{label}/
            </h3>

            {words.map((w) => (
                <Card key={w.id} id={w.id} emoji={w.emoji} />
            ))}
        </div>
    );
}
