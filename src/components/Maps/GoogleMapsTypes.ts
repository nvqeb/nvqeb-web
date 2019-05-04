export interface IPlaceDetailsResult {
    address_components: IAddressComponent[];
    formatted_address: string;
    formatted_phone_number: string;
    adr_address: string;
    geometry: IAddressGeometry;
    icon: string;
    international_phone_number: string;
    name: string;
    permanently_closed: boolean;
    place_id: string;
    price_level: number;
    rating: number;
    types: AddressType[];
    url: string;
    utc_offset: number;
    vicinity: string;
    website: string;
}

export interface IAddressGeometry {
    location: ILatLngLiteral;
}

export interface IAddressComponent {
    types: Array<AddressType | GeocodingAddressComponentType>;
    long_name: string;
    short_name: string;
}

export type GeocodingAddressComponentType = (
    "floor" |
    "establishment" |
    "point_of_interest" |
    "parking" |
    "post_box" |
    "postal_town" |
    "room" |
    "street_number" |
    "bus_station" |
    "train_station" |
    "transit_station"
);

export type AddressType = (
    "street_address" |
    "route" |
    "intersection" |
    "political" |
    "country" |
    "administrative_area_level_1" |
    "administrative_area_level_2" |
    "administrative_area_level_3" |
    "administrative_area_level_4" |
    "administrative_area_level_5" |
    "colloquial_area" |
    "locality" |
    "ward" |
    "sublocality" |
    "sublocality_level_1" |
    "neighborhood" |
    "premise" |
    "subpremise" |
    "postal_code" |
    "natural_feature" |
    "airport" |
    "park" |
    "point_of_interest"
);

export interface ILatLngLiteral {
    lat: () => number;
    lng: () => number;
}
