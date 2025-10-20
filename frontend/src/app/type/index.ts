//language
export enum Language {
  Spanish = "es",
  French = "fr",
  German = "de",
  Japanese = "ja",
}

//id, title, language, preview, level
export interface Article {
  id: string;
  title: string;
  language: Language;
  preview: string;
  level: "beginner" | "intermediate" | "advanced";
}
