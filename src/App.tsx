import { useState, useRef } from 'react';
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import type { Word } from './data/words';
import Column from './components/Column';
import Pool from './components/Pool';
import { words as initial} from './data/words';

type Containers = {
    pool: Word[];
    a: Word[];
    i: Word[];
};

export default function App() {
    /* ---------- stan kart ---------- */
    const [items, setItems] = useState<Containers>({
        pool: initial,
        a: [],
        i: [],
    });

    /* ---------- dźwięki ---------- */
    const winRef  = useRef(new Audio('/audio/win.mp3'));
    const loseRef = useRef(new Audio('/audio/lose.mp3'));

    /* ---------- DnD ---------- */
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const fromId = (Object.keys(items) as (keyof Containers)[])
            .find((key) => items[key].some((w) => w.id === active.id));

        const toId = over.id as keyof Containers;
        if (!fromId || fromId === toId) return;

        setItems((prev) => {
            const moved = prev[fromId].find((w) => w.id === active.id)!;
            return {
                ...prev,
                [fromId]: prev[fromId].filter((w) => w.id !== active.id),
                [toId]: [...prev[toId], moved],
            };
        });
    };

    /* ---------- walidacja + audio ---------- */
    const checkAnswers = () => {
        const wrongA = items.a.filter((w) => w.vowel !== 'a');
        const wrongI = items.i.filter((w) => w.vowel !== 'i');
        const done   = items.pool.length === 0;

        const success = !wrongA.length && !wrongI.length && done;

        const ref = success ? winRef : loseRef;
        ref.current.currentTime = 0;
        ref.current.play();

        alert(success ? 'Great job! 🎉' : 'Try again 🙈');
    };

    /* ---------- UI ---------- */
    return (
        <div className="wrapper">
            <h1 className="title">Match the Middle Sound</h1>

            <div className="board">
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    <div className="columns">
                        <Column id="a" label="ă" words={items.a} />
                        <Column id="i" label="ĭ" words={items.i} />
                    </div>

                    {/*  pula kart do przeciągania  */}
                    <Pool id="pool" words={items.pool} />
                </DndContext>

                <button className="submit-btn" onClick={checkAnswers}>
                    Submit
                </button>
            </div>
        </div>
    );
}