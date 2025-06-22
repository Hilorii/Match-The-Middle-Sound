import type { Word } from '../data/words';

interface ModalProps {
    message: string;
    type: 'win' | 'lose';
    wrong: Word[];
    onClose: () => void;
}

export default function Modal({ message, type, wrong, onClose }: ModalProps) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={`modal ${type === 'win' ? 'modal-win' : 'modal-lose'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <h2>{message}</h2>

                {type === 'lose' && wrong.length > 0 && (
                    <>
                        <p className="hint-title">Check these cards:</p>
                        <ul className="wrong-list">
                            {wrong.map((w) => (
                                <li key={w.id}>
                                    <span className="emoji">{w.emoji}</span>
                                    &nbsp;→ /{w.vowel}/
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
}
