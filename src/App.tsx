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
import Column  from './components/Column';
import Pool    from './components/Pool';
import Modal   from './components/Modal';
import Progress from './components/Progress';
import { getRandomWords } from './data/words';

import winMp3  from '/audio/win.mp3?url';
import loseMp3 from '/audio/lose.mp3?url';

type Boxes = { pool: Word[]; a: Word[]; i: Word[] };

function getBadge(wins: number) {
    if (wins >= 3) return '🏆 Master';
    if (wins >= 2) return '🥈 Silver Star';
    if (wins >= 1)  return '🥉 Bronze Star';
    return null;
}

export default function App() {
    /* --- cards --- */
    const [items, setItems] = useState<Boxes>(() => ({
        pool: getRandomWords(),
        a: [],
        i: [],
    }));

    /* --- progress --- */
    const [wins,     setWins]     = useState(() => Number(localStorage.getItem('wins')     ?? 0));
    const [attempts, setAttempts] = useState(() => Number(localStorage.getItem('attempts') ?? 0));
    const badge = getBadge(wins);

    /* >>> funkcja resetu */
    const handleResetProgress = () => {
        localStorage.removeItem('wins');
        localStorage.removeItem('attempts');
        setWins(0);
        setAttempts(0);
    };

    /* --- modal state --- */
    const [modal, setModal] = useState<{open:boolean; msg:string; type:'win'|'lose'}>({
        open: false,
        msg: '',
        type: 'win',
    });

    /* --- audio --- */
    const winRef  = useRef<HTMLAudioElement | null>(null);
    const loseRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        winRef.current  = new Audio(winMp3);
        loseRef.current = new Audio(loseMp3);
    }, []);

    /* --- sensors --- */
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

        setItems(prev => {
            const moved = prev[fromId].find(w => w.id === active.id)!;
            return {
                ...prev,
                [fromId]: prev[fromId].filter(w => w.id !== active.id),
                [toId]:   [...prev[toId], moved],
            };
        });
    };

    /* --- check & popup --- */
    const checkAnswers = () => {
        const wrongA = items.a.filter(w => w.vowel !== 'a');
        const wrongI = items.i.filter(w => w.vowel !== 'i');
        const done   = items.pool.length === 0;
        const ok     = !wrongA.length && !wrongI.length && done;

        const ref = ok ? winRef.current : loseRef.current;
        ref?.play().catch(()=>{});

        /* update progress */
        setAttempts(a => { const n=a+1; localStorage.setItem('attempts', String(n)); return n; });
        if (ok) setWins(w => { const n=w+1; localStorage.setItem('wins', String(n)); return n; });

        setModal({
            open: true,
            msg: ok ? 'Great job! 🎉' : 'Try again 🙈',
            type: ok ? 'win' : 'lose',
        });
    };

    /* --- close modal => reset cards --- */
    const closeModal = () => {
        setModal(m => ({ ...m, open:false }));
        setItems({ pool: getRandomWords(), a: [], i: [] });
    };

    /* --- UI --- */
    return (
        <div className="wrapper">
            <h1 className="title">Match&nbsp;the&nbsp;Middle&nbsp;Sound</h1>

            <Progress
                wins={wins}
                attempts={attempts}
                badge={badge}
                onReset={handleResetProgress}
            />

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

            {modal.open && (
                <Modal
                    message={modal.msg}
                    type={modal.type}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}
