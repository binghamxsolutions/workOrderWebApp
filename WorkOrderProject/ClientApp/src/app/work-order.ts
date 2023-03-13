export interface WorkOrder {
  woNum: number;
  contactName: string | null;
  contactNumber: string | null;
  email: string | null;
  dateReceived: Date | null;
  problem: string | null;
  dateAssigned: Date | null;
  technicianId: number | null;
  status: string | null;
  techComments: string | null;
  dateComplete: Date | null;
}
