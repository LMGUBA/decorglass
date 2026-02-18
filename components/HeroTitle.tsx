import React, { useState, useEffect } from 'react';

export const HeroTitle: React.FC = () => {
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [line3, setLine3] = useState('');

    // 0: start delay, 1: typing line 1, 2: typing line 2, 3: typing line 3, 4: done
    const [step, setStep] = useState(0);

    const fullLine1 = "Transformamos";
    const fullLine2 = "tus espacios";
    const fullLine3 = "con calidad";

    const typingSpeed = 60; // ms per char
    const linePause = 300; // ms between lines

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (step === 0) {
            // Initial delay before starting
            timer = setTimeout(() => setStep(1), 100);
        } else if (step === 1) {
            if (line1.length < fullLine1.length) {
                timer = setTimeout(() => {
                    setLine1(fullLine1.slice(0, line1.length + 1));
                }, typingSpeed);
            } else {
                timer = setTimeout(() => setStep(2), linePause);
            }
        } else if (step === 2) {
            if (line2.length < fullLine2.length) {
                timer = setTimeout(() => {
                    setLine2(fullLine2.slice(0, line2.length + 1));
                }, typingSpeed);
            } else {
                timer = setTimeout(() => setStep(3), linePause);
            }
        } else if (step === 3) {
            if (line3.length < fullLine3.length) {
                timer = setTimeout(() => {
                    setLine3(fullLine3.slice(0, line3.length + 1));
                }, typingSpeed);
            } else {
                timer = setTimeout(() => setStep(4), linePause);
            }
        }

        return () => clearTimeout(timer);
    }, [step, line1, line2, line3]);



    return (
        <h1 className="text-[2.75rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold text-[#111] leading-[1.05] mb-7 tracking-tight min-h-[3.15em] relative">
            <div className="block">
                {line1}
            </div>
            <div className="block">
                {line2}
            </div>
            <div className="relative inline-block mt-1">
                <span className="relative z-10">
                    {line3}
                </span>
                {/* Underline animation */}
                <div
                    className={`absolute -bottom-2 left-0 h-[4px] rounded-full bg-gradient-to-r from-[#1F5E3B] via-[#2D8A5E] to-[#7BC5A3] opacity-60 transition-all duration-300 ease-out`}
                    style={{ width: step >= 3 ? (line3.length / fullLine3.length) * 100 + '%' : '0%' }}
                ></div>
            </div>
        </h1>
    );
};
