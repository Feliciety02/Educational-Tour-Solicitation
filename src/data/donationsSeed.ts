export type Donation = {
  id: string;
  donor_name: string;
  amount: number;
  is_anonymous: boolean;
  created_at: string;
};

/* edit this only */
export const seedDonations: Donation[] = [
  {
    id: "manual-1",
    donor_name: "Kimberly Malasarte",
    amount: 2700,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "manual-2",
    donor_name: "Jacquiline Ocariza",
    amount: 2500,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "manual-3",
    donor_name: "Edzel Tandingan",
    amount: 1000,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
    {
    id: "manual-3",
    donor_name: "Levi Malasarte",
    amount: 300,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
      {
    id: "manual-3",
    donor_name: "Mary Jane Lapaz",
    amount: 500,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
        {
    id: "manual-3",
    donor_name: "Alma Botavara",
    amount: 500,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
];
