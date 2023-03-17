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
