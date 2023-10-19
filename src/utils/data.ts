export const mockData = [
  {
    id: "1",
    date: "10 october 2023",
    data: [
      {
        name: "westwing",
        lead: "Douglas",
        positions: [
          {
            id: "1",
            position: "nurses",
            employee: [{ name: "Williams" }],
          },
          {
            id: "2",
            position: "cna",
            employee: [{ name: "John" }],
          },
        ],
      },
      {
        name: "eastwing",
        lead: "Johns",
        positions: [
          {
            id: "1",
            position: "nurses",
            employee: [{ name: "Ellen" }, { name: "Smith" }],
          },
          {
            id: "2",
            position: "monitors",
            employee: [{ name: "Lovely" }],
          },
        ],
      },
    ],
  },
];

export const mockEmployees = [
  {
    name: "Douglas",
    position: "nurses",
    hired_date: "10 october 2023",
  },
];


export const getWings = async () => {
  return mockData.find((w) => w.date === "10 october 2023")?.data;
};

export type WingProps = Awaited<ReturnType<typeof getWings>>
