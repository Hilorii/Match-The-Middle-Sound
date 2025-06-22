interface ModalProps {
    message: string;
    type: 'win' | 'lose';
    onClose: () => void;
}

export default function Modal({ message, type, onClose }: ModalProps) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={`modal ${type === 'win' ? 'modal-win' : 'modal-lose'}`}
                onClick={(e) => e.stopPropagation()} /* blokuje bubbla */
            >
                <h2>{message}</h2>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
}
