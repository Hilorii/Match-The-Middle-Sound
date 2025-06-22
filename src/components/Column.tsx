import { useDroppable } from '@dnd-kit/core';
import type { Word } from '../data/words';

interface Props {
    id: string;        // 'a' | 'i' | 'o' | 'e' | 'u'
    label: string;     // np. 'ă'
    words: Word[];
}

export default function Column({ id, label, words }: Props) {
    const { setNodeRef, isOver } = useDroppable({ id });

    const speak = () => {
        const utter = new SpeechSynthesisUtterance(label);
        utter.lang = 'en-US';
        utter.rate = 0.8;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
    };

    return (
        <div ref={setNodeRef} className={`column ${isOver ? 'drag-over' : ''}`}>
            <h3 onClick={speak} role="button" aria-label={`hear ${label}`}>
                /{label}/
            </h3>

            {words.map((w) => (
                <div key={w.id} id={w.id} className="card">
                    <div className="half-circle" />
                    <span className="emoji">{w.emoji}</span>
                </div>
            ))}
        </div>
    );
}
