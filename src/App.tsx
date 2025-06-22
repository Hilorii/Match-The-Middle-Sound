import { useEffect, useRef, useState } from 'react';
import {
    DndContext,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import type { Word } from './data/words';
import Column from './components/Column';
import Pool   from './components/Pool';
import { words as initial} from './data/words';

/* ------ audio pliki przez bundler ------ */
import winMp3  from '/audio/win.mp3?url';
import loseMp3 from '/audio/lose.mp3?url';

type Boxes = { pool: Word[]; a: Word[]; i: Word[] };

export default function App() {
    const [items, setItems] = useState<Boxes>({
        pool: initial,
        a: [],
        i: [],
    });

    /* ------ audio refs (po jednym obiekcie) ------ */
    const winRef  = useRef<HTMLAudioElement | null>(null);
    const loseRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        winRef.current  = new Audio(winMp3);
        loseRef.current = new Audio(loseMp3);
    }, []);


    /* ------ DnD sensors: pointer + touch (fallback) ------ */
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(TouchSensor,   { activationConstraint: { delay: 150, tolerance: 5 } })
    );

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (!over) return;

        const fromId = (Object.keys(items) as (keyof Boxes)[])
            .find((k) => items[k].some((w) => w.id === active.id));

        const toId = over.id as keyof Boxes;
        if (!fromId || fromId === toId) return;

        setItems((prev) => {
            const moved = prev[fromId].find((w) => w.id === active.id)!;
            return {
                ...prev,
                [fromId]: prev[fromId].filter((w) => w.id !== active.id),
                [toId]:   [...prev[toId], moved],
            };
        });
    };

    /* ---------- walidacja + audio ---------- */
    const checkAnswers = () => {
        const wrongA = items.a.filter((w) => w.vowel !== 'a');
        const wrongI = items.i.filter((w) => w.vowel !== 'i');
        const done   = items.pool.length === 0;

        const ok = !wrongA.length && !wrongI.length && done;

        /* ----- ODTWÓRZ WŁAŚCIWY DŹWIĘK ----- */
        const ref = ok ? winRef.current : loseRef.current;
        if (ref) {
            ref.currentTime = 0;
            ref.play();
        }

        alert(ok ? 'Great job! 🎉' : 'Try again 🙈');
    };

    /* ------ UI ------ */
    return (
        <div className="wrapper">
            <h1 className="title">Match&nbsp;the&nbsp;Middle&nbsp;Sound</h1>

            <div className="board">
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    <div className="columns">
                        <Column id="a" label="ă" words={items.a} />
                        <Column id="i" label="ĭ" words={items.i} />
                    </div>

                    <Pool id="pool" words={items.pool} />
                </DndContext>

                <button className="submit-btn" onClick={checkAnswers}>
                    Submit
                </button>
            </div>
        </div>
    );
}
