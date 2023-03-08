export interface Room {
  id: string;
  title: string;
  image: string;
  description: string;
  pricePerNight: number;
  location: {
    type: string;
    coordinates: number[];
    address: string;
  };
  propertyType: string;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  amenities: string[];
  images: string[];
  owner: any;
}
