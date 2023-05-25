export interface Room {
  _id: string;
  name: string;
  icon_url: string;
  description: string;
}

export interface PlaceType {
  _id: string;
  name: string;
  description: string;
}

export interface PropertyType {
  _id: string;
  name: string;
  icon_url: {
    publicUrl: string;
    hint: string;
  };
  description: string;
}
export interface RoomBooked {
  status: string;
  _id: string;
  user: User;
  room: Room;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  adults: number;
  children: number;
  pets: number;
  totalPrice: number;
  createdAt: Date;
  __v: number;
}

export interface Room {
  location: Location;
  categories: string[];
  isAllowBet: boolean;
  amenities: string[];
  images: Image[];
  isDeleted: boolean;
  bookings: string[];
  reviews: string[];
  _id: string;
  placeType: string;
  propertyType: string;
  name: string;
  description: string;
  pricePerNight: number;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  livings: number;
}

export interface Image {
  publicUrl: string;
  hint: string;
}

export interface Location {
  type: string;
  coordinates: number[];
  address: string;
}

export interface User {
  profilePic: string;
  hintPic: string;
  description: string;
  phoneNumber: string;
  gender: string;
  address: string;
  verified: boolean;
  listings: any[];
  bookings: any[];
  reviews: string[];
  isHost: boolean;
  isAdmin: boolean;
  resetPwLink: string;
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: Date;
  tokens: Token[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Token {
  _id: string;
  token: string;
}

export interface Track {
  name: string;
  duration: number;
}
