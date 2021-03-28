export interface User {
  pclass: number;
  survived: number;
  name: string;
  sex: string;
  age: any;
  sibsp: number;
  parch: number;
  ticket: any;
  fare: any;
  cabin: string;
  embarked: string;
  boat: any;
  body: any;
  'home.dest': string;
}

export interface Filter {
  name: string;
  age: number | null;
  gender: string | null;
}