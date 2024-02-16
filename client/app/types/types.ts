import { IconType } from "react-icons";

export interface Property {
  id: number;
  pub_date: string;
  name: string;
  price: number;
  images: {
    file_name: string;
    image_path: string;
  }[];
  address: string;
  description: string;
  reference: string;
}

export interface PaginationProperties {
  total: number;
  current_page: number;
  properties_per_page: number;
  num_pages: number;
  results: Property[];
}

export interface Condition {
  name: string;
  isSelected: boolean;
}

export interface Filter {
  id: string;
  label: string;
  icon: IconType;
}
