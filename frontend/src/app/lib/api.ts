// //create a mock backend to test frontend later

// import { Language, Article } from "../type";

// //create mock database
// const mockArticles: Article[] = [
//   {
//     id: "1",
//     title: "El Clásico: Una Rivalidad Histórica",
//     language: Language.Spanish,
//     preview:
//       "El partido entre Real Madrid y Barcelona es más que un simple encuentro...",
//     level: "intermediate",
//   },
//   {
//     id: "2",
//     title: "Le Tour de France: Plus Qu'une Course",
//     language: Language.French,
//     preview:
//       "Chaque été, la France vibre au rythme du Tour de France, l'un des plus grands...",
//     level: "beginner",
//   },
//   {
//     id: "3",
//     title: "Die Berliner Mauer: Geschichte und Gedenken",
//     language: Language.German,
//     preview:
//       "Die Berliner Mauer teilte die Stadt und wurde zum Symbol des Kalten Krieges...",
//     level: "advanced",
//   },
//   {
//     id: "4",
//     title: "日本の桜：文化と伝統",
//     language: Language.Japanese,
//     preview:
//       "桜の季節は、日本の春の最も美しい時期の一つであり、花見は国民的な...",
//     level: "intermediate",
//   },
//   {
//     id: "5",
//     title: "La Gastronomía de Perú: Sabores que Conquistan",
//     language: Language.Spanish,
//     preview:
//       "Desde el ceviche hasta el lomo saltado, la cocina peruana es un festín...",
//     level: "beginner",
//   },
//   {
//     id: "6",
//     title: "Le Louvre : Un Voyage à Travers l'Art",
//     language: Language.French,
//     preview:
//       "Le musée du Louvre n'est pas seulement un musée, c'est un palais qui abrite...",
//     level: "advanced",
//   },
// ];

// export const getArticles = async (): Promise<Article[]> => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return mockArticles;
// };
