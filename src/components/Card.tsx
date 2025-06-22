import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

type Props = { id: string; emoji: string };

export default function Card({ id, emoji }: Props) {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({ id });

    const style: React.CSSProperties = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.4 : 1,
    };

    return (
        <div ref={setNodeRef} className="card" style={style} {...listeners} {...attributes}>
            {emoji}
        </div>
    );
}
