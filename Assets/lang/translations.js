/* MuslimPhonics – tableau unique des traductions.
   Une clé = un emplacement dans la page (attribut data-tr="clé").
   fr / ar : texte affiché comme aide. Pour ajouter une langue : ajouter un bloc
   (ex. "ur": {...}) dans chaque histoire + une entrée dans MP_LANGS ; aucun code à toucher.
   Si une clé manque dans une langue, le français est affiché.
   en : pas de traduction ; images des 💡 et activité « Listen and choose the picture ».
   clips : début et fin (en secondes) de chaque phrase dans <story>/full.mp3 (voix Beth),
   repérés par les silences ; 👂 et « Listen » (activités) jouent ce passage.
   wordTimes : début de chaque mot, pour le surlignage synchronisé.
   MP_WORDS : sens des mots touchés dans l'histoire (glossaire commun au livre).
   Arabe Story 1 + glossaire : relus et validés par la collègue prof d'arabe (08/10/2026).
   ⚠ Arabe à faire relire pour le reste (consignes MP_INSTR, « a », « Slow reading »). */

window.MP_LANGS = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية", rtl: true, hidden: true }  /* masqué jusqu'à la relecture par une enseignante d'arabe */
];

/* Libellés des boutons, dans la langue choisie. */
window.MP_UI = {
  slow: { en: "Slow reading", fr: "Lecture lente", ar: "قِرَاءَةٌ بَطِيئَةٌ" }
};

/* Glossaire du livre : bulle affichée quand on touche un mot de l'histoire
   (sens du mot, pas de grammaire). Une entrée par mot, en minuscules,
   commune à toutes les histoires. img = image montrée dans toutes les langues.
   En arabe, « a » / « the » + nom se touchent ensemble : ar = nom avec tanwīn
   (a cap), arAl = nom avec alif lām (the cap) ; à remplir pour chaque nom. */
window.MP_WORDS = {
  sam:  { fr: "prénom d'un garçon", ar: "سَامْ", en: "a boy's name", img: "story1-boy" },
  dad:  { fr: "papa", ar: "الْأَبُ", en: "father", img: "dad" },
  cap:  { fr: "casquette", ar: "قُبَّعَةٌ", arAl: "الْقُبَّعَةُ", en: "", img: "cap" },
  bag:  { fr: "sac", ar: "حَقِيبَةٌ", arAl: "الْحَقِيبَةُ", en: "", img: "bag" },
  has:  { fr: "a (avoir)", ar: "لَدَى / عِنْدَ", en: "<i>to have</i>" },
  is:   { fr: "est (être)", ar: "فِعْلُ ⁦to be⁩", en: "<i>to be</i>" },
  runs: { fr: "court", ar: "يَرْكُضُ", en: "<i>to run</i>", img: "ran" },
  red:  { fr: "rouge", ar: "أَحْمَرُ", en: "", img: "red" },
  glad: { fr: "content", ar: "مَسْرُورٌ", en: "happy", img: "story1-boy" },
  a:    { fr: "un / une", ar: "وَاحِدٌ", en: "one" },
  the:  { fr: "le / la", ar: "الْـ", en: "" },
  to:   { fr: "vers", ar: "إِلَى", en: "towards" },
  too:  { fr: "aussi", ar: "أَيْضًا", en: "also" }
};

/* Consignes des activités : 💡 à côté de chaque consigne en anglais
   (titres d'activité + phrases marquées data-mp-instr), communes à tout le livre.
   Clé = consigne anglaise en minuscules, sans emoji, sans « Activity N — »
   ni ponctuation finale. Pas de 💡 en English. */
window.MP_INSTR = {
  "look at the picture. mark the correct word": { fr: "Regarde l'image. Choisis le bon mot." },
  "match the word to the picture": { fr: "Relie le mot à la bonne image." },
  "type the word": { fr: "Écris le mot." },
  "choose the correct sentence": { fr: "Choisis la bonne phrase." },
  "choose the correct word": { fr: "Choisis le bon mot." },
  "translation": { fr: "Traduction : écris la phrase en anglais." },
  "find the word in the text": { fr: "Trouve le mot dans le texte." },
  "look at the picture. find it in the text": { fr: "Regarde l'image. Trouve ce mot dans le texte." },
  "think together": { fr: "Réfléchissons ensemble." },
  "read and listen to yourself": { fr: "Lis et écoute-toi." },
  "read the story aloud. record your voice and listen to yourself": { fr: "Lis l'histoire à voix haute. Enregistre ta voix, puis écoute-toi." },
  "how was your reading": { fr: "Comment était ta lecture ?" },
  "find the rhyme": { fr: "Trouve le mot qui rime." },
  "look at the picture and write a sentence": { fr: "Regarde l'image et écris une phrase." },
  "put the sentences in order": { fr: "Remets les phrases dans l'ordre." },
  "unscramble the letters": { fr: "Remets les lettres dans l'ordre." },
  "memory": { fr: "Jeu de mémoire." },
  "crossword": { fr: "Mots croisés." },
  "match the picture to the sentence": { fr: "Relie l'image à la bonne phrase." },
  "word search": { fr: "Mots cachés." },
  "reveal the puzzle": { fr: "Découvre l'image cachée." },
  "sort into the basket": { fr: "Range dans le panier." },
  "true or false": { fr: "Vrai ou faux ?" },
  "fill in the blank": { fr: "Complète avec le mot qui manque." },
  "riddle": { fr: "Devinette." }
};

window.MP_TR = {

  story1: {
    fr: {
      help1: "Sam a une casquette.",
      help2: "La casquette est rouge.",
      help3: "Sam a un sac.",
      help4: "Le sac est rouge aussi.",
      help5: "Sam court vers Papa.",
      help6: "Papa a une casquette.",
      help7: "Sam est content.",
      tr1: "Le sac est rouge.",
      tr2: "Papa a un sac.",
      thinkIntro: "Ces questions sont liées au programme de <em>Sciences / cursus British KG1‑KG2</em> — les propriétés des matériaux et les fonctions des objets.",
      q1: "À quoi sert une casquette ?",
      q1a: "Une casquette protège du soleil.",
      q1b: "Une casquette est pour les pieds.",
      q1c: "Une casquette est pour la main.",
      "q1-feedback": "Oui ! Une casquette protège la tête du soleil.",
      q2: "Est-ce qu’une casquette est douce ou dure ?",
      q2a: "Douce / molle.",
      q2b: "Dure.",
      "q2-feedback": "Correct ! Une casquette est douce — on peut la plier."
    },
    ar: {
      help1: "لَدَى سَامْ قُبَّعَةٌ.",
      help2: "الْقُبَّعَةُ حَمْرَاءُ.",
      help3: "لَدَى سَامْ حَقِيبَةٌ.",
      help4: "الْحَقِيبَةُ حَمْرَاءُ أَيْضًا.",
      help5: "يَرْكُضُ سَامْ إِلَى أَبِيهِ.",
      help6: "لَدَى الْأَبِ قُبَّعَةٌ.",
      help7: "سَامْ مَسْرُورٌ.",
      tr1: "الْحَقِيبَةُ حَمْرَاءُ.",
      tr2: "لَدَى الْأَبِ حَقِيبَةٌ.",
      thinkIntro: "هَذِهِ الْأَسْئِلَةُ مُرْتَبِطَةٌ بِمَنْهَجِ الْعُلُومِ الْبِرِيطَانِيِّ (⁦KG1–KG2⁩): خَصَائِصُ الْمَوَادِّ وَاسْتِعْمَالَاتُ الْأَشْيَاءِ.",
      q1: "مَا فَائِدَةُ الْقُبَّعَةِ؟",
      q1a: "الْقُبَّعَةُ تَحْمِي الرَّأْسَ مِنَ الشَّمْسِ.",
      q1b: "الْقُبَّعَةُ لِلْقَدَمَيْنِ.",
      q1c: "الْقُبَّعَةُ لِلْيَدِ.",
      "q1-feedback": "نَعَمْ! الْقُبَّعَةُ تَحْمِي الرَّأْسَ مِنَ الشَّمْسِ.",
      q2: "هَلِ الْقُبَّعَةُ لَيِّنَةٌ أَمْ صَلْبَةٌ؟",
      q2a: "لَيِّنَةٌ.",
      q2b: "صَلْبَةٌ.",
      "q2-feedback": "صَحِيحٌ! الْقُبَّعَةُ لَيِّنَةٌ، يُمْكِنُكَ طَيُّهَا."
    },
    clips: {
      help1: [2.96, 4.31], help2: [6.36, 7.55], help3: [9.80, 11.00], help4: [12.58, 14.07],
      help5: [15.56, 17.13], help6: [19.10, 20.12], help7: [21.89, 23.22]
    },
    /* début (en secondes) de chaque mot de chaque phrase, pour le surlignage
       pendant la lecture ; repéré par reconnaissance vocale (Whisper) */
    wordTimes: {
      help1: [2.96, 3.40, 3.84, 4.02],
      help2: [6.36, 6.44, 6.74, 7.04],
      help3: [9.80, 10.12, 10.38, 10.54],
      help4: [12.58, 12.66, 12.98, 13.18, 13.48],
      help5: [15.56, 15.90, 16.20, 16.56],
      help6: [19.10, 19.32, 19.56, 19.72],
      help7: [21.89, 22.31, 22.61]
    },
    en: {
      /* image montrée par chaque 💡 de l'histoire (Assets/images/<nom>.png) */
      helpImg: {
        help1: "cap", help2: "red", help3: "bag", help4: "bag",
        help5: "ran", help6: "dad", help7: "story1-boy"
      },
      /* remplace l'activité Translation ; clip = phrase de l'histoire jouée ;
         correct = position (0, 1, 2) de la bonne image */
      listen: [
        { clip: "help4", say: "The bag is red too.", images: ["cap", "bag", "dad"], correct: 1 },
        { clip: "help6", say: "Dad has a cap.",      images: ["dad", "story1-boy", "ran"], correct: 0 }
      ]
    }
  }

};
