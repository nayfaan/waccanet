import { LatLngTuple } from "leaflet";
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

export interface PropertyExistResponse {
  exist: boolean;
}

export interface PropertyRegisterData {
  ownerName: string;
  ownerAddress: string;
  ownerEmail: string;
  ownerPhoneNumber: string;
  title: string;
  rent: string;
  roomType: string;
  houseAddress: string;
  center: LatLngTuple;
  station: string;
  area: string;
  images: string[];
  wifi: boolean;
  utilities: boolean;
  furnished: boolean;
  laundry: boolean;
  gender: string;
  minimumStay: string;
  roommates: string;
  payment: string;
  takeover: string;
  onlineViewing: boolean;
  moveInDate: Date;
  description: string;
}

export interface PropertyRegisterDataPrevious {
  pub_date: Date;
  title: string;
  // images: string[];
  rent: string;
  description: string;
  reference: String;
  ownerEmail: string;
}

export interface PaginationProperties {
  total: number;
  current_page: number;
  properties_per_page: number;
  num_pages: number;
  results: Property[];
}

export interface SearchParams {
  price_from: string;
  price_to: string;
  roomTypes: string[];
  roommates: string[];
  gender: string[];
  areas: string[];
  stations: string[];
  utilities: string[];
  wifi: string[];
  furnished: string[];
  takeover: string[];
  moveInDate: string;
  paymentMethod: string[];
  onlineViewing: string[];
  minimumStay: string[];
  references: string[];
  search_query: string[];
  page: string;
  [key: string]: string | string[];
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
