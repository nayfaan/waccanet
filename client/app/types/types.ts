import { LatLngTuple } from "leaflet";
import { IconType } from "react-icons";

export interface Property {
  id: number;
  owner: {
    user_id: number;
    user_name: string;
    password: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhoneNumber: string;
  };
  pub_date: Date;
  title: string;
  price: number;
  images: {
    file_name: string;
    image_path: string;
  }[];
  address: string;
  roomType: string;
  latitude: null;
  longitude: null;
  station: string;
  area: string;
  wifi: boolean;
  utilities: boolean;
  furnished: boolean;
  laundry: boolean;
  gender: string;
  minimumStay: string | number;
  payment: string;
  roommates: number;
  takeover: number;
  onlineViewing: boolean;
  moveInDate: Date;
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
  pub_date: Date;
  title: string;
  rent: string;
  roomType: string;
  houseAddress: string;
  center: LatLngTuple;
  station: string;
  area: string;
  images: File[];
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
  reference: string;
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
  utilities: "0" | "1";
  wifi: "0" | "1";
  furnished: "0" | "1";
  takeover: "0" | "1";
  moveInDate: string;
  paymentMethod: string[];
  onlineViewing: "0" | "1";
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

export interface ContactData {
  pub_date: Date;
  first_name: string;
  last_name: string;
  email_address: string;
  contact_type: string;
  detail: string;
}
