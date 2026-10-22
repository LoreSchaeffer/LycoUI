interface InputStepButtonsProps {
    onStep: (event: React.MouseEvent<HTMLButtonElement>, direction: 1 | -1) => void;
}

export function InputStepButtons({onStep}: InputStepButtonsProps) {
    return <div className="input-step-buttons">
        <button type="button" className="input-step-btn input-step-btn-up" onClick={(event) => onStep(event, 1)} aria-label="Increment"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg></button>
        <button type="button" className="input-step-btn input-step-btn-down" onClick={(event) => onStep(event, -1)} aria-label="Decrement"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></button>
    </div>;
}

