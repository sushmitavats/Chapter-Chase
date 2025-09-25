export interface Book {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year?: number;
  isbn?: string;
  cover_i?: number;
  subject?: string[];
  publisher?: string[];
  language?: string[];
  number_of_pages_median?: number;
}

export interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  isbn?: string[];
  cover_i?: number;
  subject?: string[];
  publisher?: string[];
  language?: string[];
  number_of_pages_median?: number;
}

export interface SearchResponse {
  docs: OpenLibraryDoc[];
  numFound: number;
  start: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}