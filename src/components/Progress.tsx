interface ProgressProps {
    wins: number;
    attempts: number;
    badge: string | null;
    onReset: () => void;
}

export default function Progress({ wins, attempts, badge, onReset }: ProgressProps) {
    const percent = attempts ? Math.round((wins / attempts) * 100) : 0;

    return (
        <div className="progress-wrapper">
            {/* Zielony pasek */}
            <div className="progress-bar" style={{ width: `${percent}%` }} />

            {/* Licznik + odznaka */}
            <div className="progress-label">
                {wins}/{attempts} ({percent}%)
                {badge && <span className="badge"> {badge}</span>}
            </div>

            {/* Reset */}
            <button className="reset-btn" onClick={onReset} title="Reset progress">
                ⟲
            </button>
        </div>
    );
}
