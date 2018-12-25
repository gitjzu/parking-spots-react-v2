import I18n from "i18n-js";
import { Localization } from "expo-localization";
import en from "./en";
import fi from "./fi";

I18n.fallbacks = true;

I18n.translations = {
  en,
  fi
};

I18n.locale = Localization.locale;

export default I18n;
