export type Branch = {
  id: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
};

export const branches: Branch[] = [
  {
    id: "detroit-michigan",
    city: "Detroit, MI",
    address: "10565 W Chicago, Detroit, MI 48204",
    lat: 42.3486,
    lng: -83.1763,
    phone: "(404) 555-CRUNCH",
  },
  {
    id: "atlanta-ga",
    city: "Atlanta, GA",
    address: "Business Park Drive, Suite 400, Atlanta, GA 30339",
    lat: 33.749,
    lng: -84.388,
    phone: "(404) 555-CRUNCH",
  },
  {
    id: "los-angeles-ca",
    city: "Los Angeles, CA",
    address: "4500 Sunset Blvd, Los Angeles, CA 90027",
    lat: 34.0989,
    lng: -118.2912,
    phone: "(404) 555-CRUNCH",
  },
  {
    id: "houston-tx",
    city: "Houston, TX",
    address: "2200 Westheimer Rd, Houston, TX 77098",
    lat: 29.7423,
    lng: -95.4145,
    phone: "(404) 555-CRUNCH",
  },
  {
    id: "miami-fl",
    city: "Miami, FL",
    address: "1500 Ocean Dr, Miami Beach, FL 33139",
    lat: 25.7826,
    lng: -80.13,
    phone: "(404) 555-CRUNCH",
  },
];
