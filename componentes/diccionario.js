const dictionaries = {
    en: {
      title: "Page about the PokeApi",
      inicio: "Home",
      generaciones: "Generations",
    },
    es: {
      title: "Página sobre la PokeApi",
      inicio: "Inicio",
      generaciones: "Generaciones",
    },
    fr: {
      title: "Page sur le PokeApi",
      inicio: "Commencer",
      generaciones: "Générations",
    },
    
  };
  
  export const getDictionary = (lang) => dictionaries[lang];
  
  