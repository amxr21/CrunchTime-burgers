export type LocationItem = {
  street: string;
  city: string;
  address: string;
  phone: string;
};

export const locations: LocationItem[] = [
  {
    street: "Street 10565",
    city: "Michigan",
    address: "XXXXX W Chicago, Detroit, MI XXXXX",
    phone: "(404) 555-CRUNCH",
  },
  {
    street: "Street 10565",
    city: "Michigan",
    address: "XXXXX W Chicago, Detroit, MI XXXXX",
    phone: "(404) 555-CRUNCH",
  },
  {
    street: "Street 10565",
    city: "Michigan",
    address: "XXXXX W Chicago, Detroit, MI XXXXX",
    phone: "(404) 555-CRUNCH",
  },
  {
    street: "Street 10565",
    city: "Michigan",
    address: "XXXXX W Chicago, Detroit, MI XXXXX",
    phone: "(404) 555-CRUNCH",
  },
  {
    street: "Street 10565",
    city: "Michigan",
    address: "XXXXX W Chicago, Detroit, MI XXXXX",
    phone: "(404) 555-CRUNCH",
  },
];

export type WorkingHours = {
  label: string;
  hours: string;
};

export const workingHours: WorkingHours[] = [
  { label: "Sundays", hours: "11:00AM - 02:00AM" },
  { label: "Monday-Friday", hours: "11:00AM - 02:00AM" },
];

export const branches = ["Branch #1", "Branch #2", "Branch #3"];
