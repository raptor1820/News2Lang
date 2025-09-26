//language
export enum Language {
  Spanish = "es",
  French = "fr",
  German = "de",
  Japanese = "ja",
}

//id, title, language, preview, level
export interface Aritcle {
  id: string;
  title: string;
  language: Language;
  preview: string;
  level: "beginner" | "itermidiate" | "advanced";
}
