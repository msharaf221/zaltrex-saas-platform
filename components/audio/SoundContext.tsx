"use client";

import React, { createContext, useContext, useState, useRef } from "react";

interface SoundContextType {
  audioEnabled: boolean;
  toggleAudio: () => void;
  playHover: () => void;
  playClick: () => void;
  playSuccess: () => void;
}

const SoundContext = createContext<SoundContextType>({
  audioEnabled: true,
  toggleAudio: () => {},
  playHover: () => {},
  playClick: () => {},
  playSuccess: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioContextRef.current && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
  };

  const playTone = (freq: number, type: OscillatorType = "sine", duration = 0.08, gainVal = 0.04) => {
    if (!audioEnabled) return;
    try {
      initAudio();
      const ctx = audioContextRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio playback fails gracefully if blocked by browser policy
    }
  };

  const playHover = () => playTone(540, "triangle", 0.04, 0.015);
  const playClick = () => playTone(880, "sine", 0.07, 0.05);
  const playSuccess = () => {
    playTone(523.25, "sine", 0.08, 0.04);
    setTimeout(() => playTone(659.25, "sine", 0.1, 0.04), 60);
  };

  const toggleAudio = () => {
    setAudioEnabled((prev) => !prev);
  };

  return (
    <SoundContext.Provider value={{ audioEnabled, toggleAudio, playHover, playClick, playSuccess }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
