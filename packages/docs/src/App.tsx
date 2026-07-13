import React from 'react';

export const App: React.FC = () => {
    return (
        <div className="theme-blue" style={{padding: 'var(--spacing-8)'}}>
            <h1>Lyco UI Design System</h1>
            <p style={{color: 'var(--color-text-secondary)'}}>
                Documentation and component playground.
            </p>
            {/*
        TODO: Import components from 'lyco-ui' here
        Example: <StatusBadge status="primary" />
      */}
        </div>
    );
};