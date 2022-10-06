/* eslint-disable @typescript-eslint/no-explicit-any */
export type WorkType = 'fullTime' | 'halfTime';

export interface AttributesCategory {
  categoryTitle: string,
  slug: string,
}

export interface Category {
  attributes: AttributesCategory,
  id: string,
}

export interface DataCategory {
  data: Category[],
}

export interface DataVacancy {
  data: Category[],
}

export interface Collection {
  attributes: AttributesCollection,
  id: string,
}

export interface AttributesCollection {
  keyPhrase: string,
}

export interface Vacancy {
  attributes: AttributesVacancy,
  id: string,
}

export interface AttributesVacancy {
  title: string,
  locale: string,
  workType: string,
  categories: DataCategory,
  keyword_tags: DataKeywords,
}

export interface DataKeywords {
  data: KeyWord[],
}

export interface KeyWord {
  attributes: KeyWordAttributes,
  id: string,
}

export interface KeyWordAttributes {
  keyPhrase: string,
}

export interface IFeedbackFormData {
  name: string;
  phone: string;
  age: string;
  EnglishLevel: string;
  email: string;
  file: FileList;
}

export interface VacancyArray {
  id: number;
  attributes: any;
}

export interface vacancyTypes {
  id: number,
  attributes: {
    title: string,
  }
}

export interface LocalVacancyType {
  attributes: any;
  id: number;
  description: string;
}
