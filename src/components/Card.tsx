import { useDraggable } from '@dnd-kit/core';

interface CardProps {
    id: string;
    emoji: string;
}

export default function Card({ id, emoji }: CardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useDraggable({ id });

    const style: React.CSSProperties = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        opacity: isDragging ? 0.4 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            className="card"
            style={style}
            {...listeners}
            {...attributes}
        >
            {/* wcięcie puzzla */}
            <div className="half-circle" />

            {/* zawartość */}
            <span className="emoji">{emoji}</span>
        </div>
    );
}
