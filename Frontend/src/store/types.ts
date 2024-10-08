export interface Slide {
  title: string;
  content: string;
}

export interface Presentation {
  title: string;
  authors: string[];
  dateOfPublishment: string;
  slides: Slide[];
}
