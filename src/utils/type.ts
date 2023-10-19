export type Schedules = {
  id: string;
  name: string;
  date: string;
  description: string;
  units: Units[];
};

export type Units = {
  id: string;
  name: string;
  lead: string;
};
