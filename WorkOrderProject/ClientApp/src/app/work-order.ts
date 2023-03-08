export interface WorkOrder {
  woNum: number;
  email: string | null;
  status: string | null;
  dateReceived: Date | null;
  dateAssigned: Date | null;
  dateComplete: Date | null;
  contactName: string | null;
  techComments: string | null;
  contactNumber: string | null;
  technicianId: number | null;
  problem: string | null;
}
