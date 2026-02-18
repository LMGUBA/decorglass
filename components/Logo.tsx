import React from 'react';

interface LogoProps {
    height?: number;
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ height = 48, className = '' }) => {
    return (
        <img
            src="/images/logo.svg"
            alt="DecorGlass - Diseños & Proyectos"
            style={{ height: `${height}px`, width: 'auto' }}
            className={className}
        />
    );
};
