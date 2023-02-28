export interface WorkOrder {
  woId: number;
  email: string | null;
  status: string | null;
  dateReceived: string | null;
  dateAssigned: string | null;
  dateComplete: string | null;
  contactName: string | null;
  techComments: string | null;
  contactNumber: string | null;
  techId: number | null;
  problem: string | null;
}
