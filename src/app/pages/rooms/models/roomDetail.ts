export interface RoomDetail {
  name: string;
  description: string;
  pricePerNight: number;
  guests: number;
  bedrooms: number;
  livingRooms: number;
  beds: number;
  baths: number;
  location: {
    type: string;
    address: string;
    coordinates: number[];
  };
  reviews: any[];
  placeType: string;
  propertyType: string;
  amenities: string[];
  categories: string[];
  images: {
    publicUrl: string;
    hint: string;
  }[];
}
