import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

/* Learning hard-mode settings, stored per device. One file per app —
   only LS_KEY differs between the Akkusativ and Dativ workbooks. */

export type LearningSettings = {
  /** der/die/das → ___ in exercise cues, vocab lists and playground buttons */
  hideArticles: boolean;
  /** no English translations in exercises & vocab */
  hideEnglish: boolean;
  /** no Tipp button in exercises — pure self-test */
  hideTips: boolean;
};

const DEFAULTS: LearningSettings = {
  hideArticles: false,
  hideEnglish: false,
  hideTips: false,
};

const LS_KEY = "akkusativ-settings-v1";

type Ctx = {
  settings: LearningSettings;
  update: (patch: Partial<LearningSettings>) => void;
  reset: () => void;
};

const SettingsCtx = createContext<Ctx>({
  settings: DEFAULTS,
  update: () => {},
  reset: () => {},
});

const load = (): LearningSettings => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<LearningSettings>) };
  } catch {
    /* ignore */
  }
  return DEFAULTS;
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<LearningSettings>(load);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  const update = (patch: Partial<LearningSettings>) =>
    setSettings((s) => ({ ...s, ...patch }));
  const reset = () => setSettings(DEFAULTS);

  return (
    <SettingsCtx.Provider value={{ settings, update, reset }}>
      {children}
    </SettingsCtx.Provider>
  );
};

export const useSettings = () => useContext(SettingsCtx);

/* Articles masked in hard mode. Possessives (mein/dein/…) and pronouns
   stay visible — otherwise exercises would become unsolvable. */
const ART_RE = /\b(der|die|das|den|dem|ein|eine|einen|einem|einer)\b/gi;

export const maskArticles = (text: string): string => text.replace(ART_RE, "___");
