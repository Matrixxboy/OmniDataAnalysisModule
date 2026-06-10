export interface DefinitionCard {
  term: string;
  definition: string;
  icon?: string;
}

export interface KeyTakeaway {
  point: string;
  detail: string;
}

export interface TheoryLessonData {
  title: string;
  subtitle: string;
  introduction: string;
  definitions: DefinitionCard[];
  mainSections: {
    heading: string;
    content: string[];
    imagePlaceholder?: string;
  }[];
  keyTakeaways: KeyTakeaway[];
}
