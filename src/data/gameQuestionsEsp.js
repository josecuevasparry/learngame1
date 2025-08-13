const gameQuestions = {
  level1: [
    // Original questions
    {
      id: 1,
      type: 'multiple',
      question: '¿Cuál es la capital de Francia?',
      options: ['Londres', 'Berlín', 'París'],
      correct: 2,
      position: { x: 200, y: 200 }
    },
    {
      id: 2,
      type: 'math',
      question: '¿Cuánto es 15 + 27?',
      answer: '42',
      position: { x: 600, y: 300 }
    },
    {
      id: 3,
      type: 'word',
      question: 'Write the opposite of "hot"',
      answer: 'cold',
      position: { x: 400, y: 500 }
    },
    // Animal questions
    {
      id: 4,
      type: 'multiple',
      question: '¿Qué tipo de animal es la tortuga marina?',
      options: ['Reptil', 'Mamífero', 'Pez'],
      correct: 0,
      position: { x: 300, y: 150 }
    },
    {
      id: 5,
      type: 'multiple',
      question: '¿Cuál es una parte importante de la dieta de la tortuga verde?',
      options: ['Focas', 'Algas y pastos marinos', 'Ballenas pequeñas'],
      correct: 1,
      position: { x: 700, y: 400 }
    },
    {
      id: 6,
      type: 'multiple',
      question: '¿Dónde viven principalmente las tortugas marinas?',
      options: ['Aguas Árticas', 'Ríos de agua dulce', 'Mares tropicales y subtropicales'],
      correct: 2,
      position: { x: 500, y: 250 }
    },
    {
      id: 7,
      type: 'pronunciation',
      question: 'Pronounce: "Sea Turtle"',
      word: 'sea turtle',
      position: { x: 150, y: 350 }
    }
  ],
  level2: [
    // Original questions
    {
      id: 8,
      type: 'multiple',
      question: '¿Qué planeta se conoce como el Planeta Rojo?',
      options: ['Venus', 'Marte', 'Júpiter'],
      correct: 1,
      position: { x: 300, y: 150 }
    },
    {
      id: 9,
      type: 'math',
      question: '¿Cuánto es 8 × 7?',
      answer: '56',
      position: { x: 700, y: 400 }
    },
    {
      id: 10,
      type: 'pronunciation',
      question: 'Pronounce: "Beautiful"',
      word: 'beautiful',
      position: { x: 500, y: 250 }
    },
    // Animal questions
    {
      id: 11,
      type: 'multiple',
      question: '¿Qué tipo de animal es el tiburón?',
      options: ['Mamífero', 'Pez', 'Reptil'],
      correct: 1,
      position: { x: 650, y: 200 }
    },
    {
      id: 12,
      type: 'multiple',
      question: '¿Cuál es una fuente principal de alimento para el tiburón blanco?',
      options: ['Focas y peces grandes', 'Plancton', 'Algas'],
      correct: 0,
      position: { x: 350, y: 450 }
    },
    {
      id: 13,
      type: 'math',
      question: 'Si un tiburón blanco mide 6 metros de largo y un delfín mide 2 metros, ¿cuántos delfines igualarían la longitud de un tiburón blanco?',
      answer: '3',
      position: { x: 300, y: 400 }
    },
    {
      id: 14,
      type: 'word',
      question: 'Write the Spanish translation for "Shark"',
      answer: 'tiburón',
      position: { x: 400, y: 350 }
    }
  ],
  level3: [
    // Original questions
    {
      id: 15,
      type: 'multiple',
      question: '¿Cuál es el océano más grande de la Tierra?',
      options: ['Atlántico', 'Índico', 'Pacífico'],
      correct: 2,
      position: { x: 150, y: 350 }
    },
    {
      id: 16,
      type: 'math',
      question: '¿Cuánto es 144 ÷ 12?',
      answer: '12',
      position: { x: 650, y: 200 }
    },
    {
      id: 17,
      type: 'word',
      question: 'Write the plural of "child"',
      answer: 'children',
      position: { x: 350, y: 450 }
    },
    // Animal questions
    {
      id: 18,
      type: 'multiple',
      question: 'La ballena azul, el animal más grande de la Tierra, es un...',
      options: ['Mamífero', 'Pez', 'Anfibio'],
      correct: 0,
      position: { x: 500, y: 300 }
    },
    {
      id: 19,
      type: 'multiple',
      question: '¿Qué come casi exclusivamente la ballena azul?',
      options: ['Tiburones pequeños', 'Animales diminutos similares a camarones llamados krill', 'Calamares gigantes'],
      correct: 1,
      position: { x: 300, y: 400 }
    },
    {
      id: 20,
      type: 'multiple',
      question: 'Las ballenas azules viven en...',
      options: ['Solo aguas cálidas tropicales', 'Todos los océanos, desde polares hasta tropicales', 'Solo las fosas profundas del Pacífico'],
      correct: 1,
      position: { x: 400, y: 350 }
    },
    {
      id: 21,
      type: 'pronunciation',
      question: 'Pronounce: "Blue Whale"',
      word: 'blue whale',
      position: { x: 500, y: 300 }
    }
  ],
  level4: [
    // Questions based on the provided images
    {
      id: 22,
      type: 'multiple',
      question: 'Do dolphins eat fish?',
      options: ['Yes, they do', 'No, they don\'t', 'Only sometimes'],
      correct: 0,
      position: { x: 200, y: 200 }
    },
    {
      id: 23,
      type: 'multiple',
      question: 'Do seahorses live on the beach?',
      options: ['Yes, they do', 'No, they don\'t', 'Only during mating season'],
      correct: 1,
      position: { x: 600, y: 300 }
    },
    {
      id: 24,
      type: 'word',
      question: 'Write the Spanish translation for "Do dolphins eat fish?"',
      answer: '¿Los delfines comen pescado?',
      position: { x: 400, y: 500 }
    },
    {
      id: 25,
      type: 'word',
      question: 'Write the Spanish translation for "Do seahorses live on the beach?"',
      answer: '¿Los caballitos de mar viven en la playa?',
      position: { x: 300, y: 150 }
    },
    {
      id: 26,
      type: 'pronunciation',
      question: 'Pronounce: "dolphin"',
      word: 'dolphin',
      position: { x: 700, y: 400 }
    },
    {
      id: 27,
      type: 'pronunciation',
      question: 'Pronounce: "seahorse"',
      word: 'seahorse',
      position: { x: 500, y: 250 }
    },
    {
      id: 28,
      type: 'multiple',
      question: 'Which word completes the sentence: "She used a _____ to sweep the floor."',
      options: ['broom', 'bloom', 'blue', 'break'],
      correct: 0,
      position: { x: 150, y: 350 }
    },
    {
      id: 29,
      type: 'multiple',
      question: 'Which word completes the sentence: "Her face turned red with a _____."',
      options: ['brush', 'blush', 'brew', 'break'],
      correct: 1,
      position: { x: 650, y: 200 }
    },
    {
      id: 30,
      type: 'multiple',
      question: 'Which word completes the sentence: "He likes to _____ coffee in the morning."',
      options: ['broom', 'bloom', 'brew', 'break'],
      correct: 2,
      position: { x: 350, y: 450 }
    },
    {
      id: 31,
      type: 'multiple',
      question: 'Which word completes the sentence: "Be careful not to _____ the glass."',
      options: ['broom', 'bloom', 'blue', 'break'],
      correct: 3,
      position: { x: 400, y: 350 }
    },
    {
      id: 32,
      type: 'pronunciation',
      question: 'Pronounce: "broom"',
      word: 'broom',
      position: { x: 500, y: 300 }
    },
    {
      id: 33,
      type: 'pronunciation',
      question: 'Pronounce: "blush"',
      word: 'blush',
      position: { x: 300, y: 400 }
    }
  ],
  level5: [
    // Questions based on the PDF content
    {
      id: 34,
      type: 'multiple',
      question: '¿Cuál es la unidad básica de todos los organismos vivos?',
      options: ['Tejido', 'Órgano', 'Célula', 'Sistema'],
      correct: 2,
      position: { x: 200, y: 200 }
    },
    {
      id: 35,
      type: 'multiple',
      question: '¿Cuál de estos es un alimento saludable para el crecimiento y reparación?',
      options: ['Dulces', 'Alimentos ricos en proteínas', 'Refrescos', 'Papas fritas'],
      correct: 1,
      position: { x: 600, y: 300 }
    },
    {
      id: 36,
      type: 'math',
      question: 'Si un estudiante lee 15 páginas por día, ¿cuántas páginas leerá en 7 días?',
      answer: '105',
      position: { x: 400, y: 500 }
    },
    {
      id: 37,
      type: 'word',
      question: '¿Cómo se llama el proceso de mezclar diferentes grupos de personas y culturas?',
      answer: 'mestizaje',
      position: { x: 300, y: 150 }
    },
    {
      id: 38,
      type: 'multiple',
      question: '¿Qué instrumento se usa típicamente en una clase de música?',
      options: ['Microscopio', 'Tubo de ensayo', 'Metalófono', 'Mechero Bunsen'],
      correct: 2,
      position: { x: 700, y: 400 }
    },
    {
      id: 39,
      type: 'multiple',
      question: '¿Qué es una habilidad importante en educación física?',
      options: ['Memorización', 'Habilidades motoras', 'Escritura', 'Lectura'],
      correct: 1,
      position: { x: 500, y: 250 }
    },
    {
      id: 40,
      type: 'pronunciation',
      question: 'Pronounce: "cell"',
      word: 'cell',
      position: { x: 150, y: 350 }
    },
    {
      id: 41,
      type: 'pronunciation',
      question: 'Pronounce: "mestizaje"',
      word: 'mestizaje',
      position: { x: 650, y: 200 }
    },
    {
      id: 42,
      type: 'multiple',
      question: '¿Qué herramienta usarías para crear una presentación?',
      options: ['Martillo', 'Software de presentaciones', 'Pincel', 'Destornillador'],
      correct: 1,
      position: { x: 350, y: 450 }
    },
    {
      id: 43,
      type: 'word',
      question: '¿Cómo se llama una estructura hecha con botellas de plástico recicladas?',
      answer: 'ecoladrillo',
      position: { x: 400, y: 350 }
    },
    {
      id: 44,
      type: 'multiple',
      question: '¿Cuál de estos ayuda a desarrollar relaciones interpersonales constructivas?',
      options: ['Ignorar a los demás', 'Buena comunicación', 'Ser grosero', 'Hablar fuerte'],
      correct: 1,
      position: { x: 500, y: 300 }
    },
    {
      id: 45,
      type: 'math',
      question: 'Si un jardín rectangular mide 8 metros de largo y 4 metros de ancho, ¿cuál es su área?',
      answer: '32',
      position: { x: 300, y: 400 }
    }
  ]
};

export default gameQuestions