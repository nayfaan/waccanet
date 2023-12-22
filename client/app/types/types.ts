export interface Property {
  id: number;
  pub_date: string;
  name: string;
  price: number;
  images: {
    image: string;
  }[];
  address: string;
  description: string;
  reference: string;
}

export interface PaginationProperties {
  count: number;
  next: string;
  previous: string;
  results: Property[];
}

export interface Condition {
  name: string;
  isSelected: boolean;
}
