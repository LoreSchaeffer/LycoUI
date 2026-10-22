import type React from 'react';
import {Notification} from './Notification';
import type {NotificationOptions} from './NotificationContext';
import type {NotificationPosition} from '../../types/types';

export interface RenderableNotification extends NotificationOptions {
    id: string;
    isExiting: boolean;
    durationSec: number;
}

export function NotificationRenderer({items, position, onClose}: {items: readonly RenderableNotification[]; position: NotificationPosition; onClose: (id: string) => void}): React.ReactElement {
    const ordered = position.startsWith('bottom') ? items : [...items].reverse();
    return <div className={`notification-stack notification-stack-${position}`} aria-live="polite" role="region" aria-label="Notifications">
        {ordered.map((item) => <Notification key={item.id} variant={item.variant} icon={item.icon} title={item.title} closable={item.closable ?? true} isFlat={item.isFlat} isExiting={item.isExiting} duration={item.durationSec} position={position} onClose={() => onClose(item.id)}>{item.description || item.message}</Notification>)}
    </div>;
}

