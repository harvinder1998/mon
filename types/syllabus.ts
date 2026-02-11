// Syllabus types

export interface Syllabus {
  id: number;
  attributes: {
    level: string;
    title: string;
    description: string;
    fileKey: string;
    version: string;
    updatedAt: string;
  };
}

export interface SyllabusData {
  data: Syllabus[];
}

export type ACCALevel =
  | 'f1'
  | 'f2'
  | 'f3'
  | 'f4'
  | 'f5'
  | 'f6'
  | 'f7'
  | 'f8'
  | 'f9'
  | 'p1'
  | 'p2'
  | 'p3'
  | 'p4'
  | 'p5'
  | 'p6'
  | 'p7';
