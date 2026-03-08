import { useSettings } from "@/hooks/useSettings";
import { getTranslation, type TranslationKey } from "@/lib/translations";

export function useTranslation() {
  const { language } = useSettings();
  const strings = getTranslation(language);

  const t = (key: TranslationKey): string => {
    return strings[key] || key;
  };

  return { t, language };
}
