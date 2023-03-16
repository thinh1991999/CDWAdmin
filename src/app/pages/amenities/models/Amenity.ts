export interface Amenity {
  id: string;
  name: string;
  icon_url: {
    publicUrl: string;
    hint: string;
  };
  description: string;
}

export interface DetailAmenity {
  _id: string;
  name: string;
  icon_url: {
    publicUrl: string;
    hint: string;
  };
  description: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  isDelete: boolean;
}
