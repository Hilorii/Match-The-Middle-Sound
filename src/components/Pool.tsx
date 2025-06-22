import { useDroppable } from '@dnd-kit/core';
import Card from './Card';
import type { Word } from '../data/words';

type Props = {
    id: string;
    words: Word[];
};

export default function Pool({ id, words }: Props) {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`pool ${isOver ? 'drag-over' : ''}`}
        >
            {words.map((w) => (
                <Card key={w.id} id={w.id} emoji={w.emoji} />
            ))}
        </div>
    );
}
