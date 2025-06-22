import { useDroppable } from '@dnd-kit/core';
import Card from './Card';
import type { Word } from '../data/words';

interface Props {
    id: 'a' | 'e' | 'i' | 'o' | 'u';
    label: string;
    words: Word[];
}

export default function Column({ id, label, words }: Props) {
    const { setNodeRef, isOver } = useDroppable({ id });

    /* — odtwarzamy gotowy plik audio zamiast TTS — */
    const playSound = () => {
        const audio = new Audio(`/audio/${id}.mkv`);
        audio.play().catch(() => {});
    };

    return (
        <div ref={setNodeRef} className={`column ${isOver ? 'drag-over' : ''}`}>
            <h3 onClick={playSound} role="button" aria-label={`hear ${label}`}>
                /{label}/
            </h3>

            {words.map((w) => (
                <Card key={w.id} id={w.id} emoji={w.emoji} />
                ))}
        </div>
    );
}
