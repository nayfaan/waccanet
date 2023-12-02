export interface Property {
  pub_date: string;
  name: string;
  imags?: string;
  price: number;
  address: string;
}

export interface Condition {
  name: string;
  isSelected: boolean;
}
