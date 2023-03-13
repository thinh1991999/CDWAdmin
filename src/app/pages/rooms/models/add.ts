export interface Add {
  name: string;
  description: string;
  pricePerNight: number;
  guests: number;
  bedrooms: number;
  livingRooms: number;
  beds: number;
  baths: number;
  latitude: number;
  longitude: number;
  address: string;
  propertyType: string;
  amenities: string[];
  categories: string[];
  images: string[];
}
