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
  shifts: Shifts[];
};

export type Shifts = {
  id: string;
  name: string;
  time: string;
  employee: Employee[];
  unitId: string;
};

export type Group = {
  id: string;
  name: string;
  time: string;
  employee: Employee[];
  unitId: string;
};

export type Employee = {
  id: string;
  shiftId: string;
  userId: string;
  user: User;
};

export type User = {
  id: string;
  name: string;
  email: string;
  position: string;
};

export type Board = {
  id: string;
  name: string;
};

export type EmployeePayload = {
  userId: string;
  shiftId: string;
  scheduleId: string;
};
