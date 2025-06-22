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
import Column   from './components/Column';
import Pool     from './components/Pool';
import Modal    from './components/Modal';
import Progress from './components/Progress';

import { getRound } from './data/words';
import winMp3  from '/audio/win.mp3?url';
import loseMp3 from '/audio/lose.mp3?url';

type Boxes = Record<string, Word[]> & { pool: Word[] };

function soundToLabel(s: string) {
    return ({ a:'ă', i:'ĭ', o:'ŏ', e:'ĕ', u:'ŭ' } as Record<string,string>)[s] || s;
}

function getBadge(w: number) {
    if (w >= 30) return '🏆 Master';
    if (w >= 15) return '🥈 Silver Star';
    if (w >= 5)  return '🥉 Bronze Star';
    return null;
}

export default function App() {
    /* --- round state --- */
    const makeBoxes = () => {
        const { sounds, pool } = getRound();
        return {
            sounds,
            boxes: { pool, [sounds[0]]: [], [sounds[1]]: [] } as Boxes,
        };
    };
    const [{ sounds, boxes }, setState] = useState(makeBoxes);

    /* --- progress --- */
    const [wins,     setWins]     = useState(() => Number(localStorage.getItem('wins') ?? 0));
    const [attempts, setAttempts] = useState(() => Number(localStorage.getItem('attempts') ?? 0));
    const badge = getBadge(wins);

    const resetProgress = () => {
        localStorage.clear();
        setWins(0); setAttempts(0);
    };

    /* --- modal --- */
    const [modal, setModal] = useState<{open:boolean; msg:string; type:'win'|'lose'}>({
        open:false, msg:'', type:'win'
    });

    /* --- audio refs --- */
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

        const fromKey = (['pool', ...sounds] as string[]).find(key =>
            boxes[key].some(w => w.id === active.id)
        );
        const toKey = over.id as string;
        if (!fromKey || fromKey === toKey) return;

        setState(s => ({
            ...s,
            boxes: {
                ...s.boxes,
                [fromKey]: s.boxes[fromKey].filter(w => w.id !== active.id),
                [toKey]:   [...s.boxes[toKey], s.boxes[fromKey].find(w => w.id === active.id)!],
            },
        }));
    };

    /* --- check, popup, next round --- */
    const checkAnswers = () => {
        const ok =
            boxes[sounds[0]].every(w => w.vowel === sounds[0]) &&
            boxes[sounds[1]].every(w => w.vowel === sounds[1]) &&
            boxes.pool.length === 0;

        (ok ? winRef.current : loseRef.current)?.play().catch(()=>{});

        setAttempts(a => { const n=a+1; localStorage.setItem('attempts', String(n)); return n; });
        if (ok) setWins(w => { const n=w+1; localStorage.setItem('wins', String(n)); return n; });

        setModal({
            open:true,
            msg: ok ? 'Great job! 🎉' : 'Try again 🙈',
            type: ok ? 'win' : 'lose',
        });
    };

    const closeModal = () => {
        setState(makeBoxes);                               // nowa losowa runda
        setModal((m) => ({ ...m, open: false }));
    };

    /* --- UI --- */
    return (
        <div className="wrapper">
            <h1 className="title">Match&nbsp;the&nbsp;Middle&nbsp;Sound</h1>

            <Progress wins={wins} attempts={attempts} badge={badge} onReset={resetProgress} />

            <div className="board">
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    <div className="columns">
                        {sounds.map((s) => (
                            <Column
                                key={s}
                                id={s}
                                label={soundToLabel(s)}
                                words={boxes[s]}
                            />
                        ))}
                    </div>

                    <Pool id="pool" words={boxes.pool} />
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
