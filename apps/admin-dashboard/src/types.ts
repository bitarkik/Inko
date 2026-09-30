export type Store = {
  id: string; name: string; owner: string; phone: string; email: string;
  area: string; zone: string; registered: string; regSort: number; days: number;
  online: number; status: string; dbStatus: string; jobs: number; failed: number; sales: number;
  cut: number; tat: number; rating: number; reviews: number; lat: number; lng: number;
  queue: number; hardware: string[]; printers: string[]; settlement: number; lastPingAt: string;
  revokedAt?: string; revokeReason?: string;
};

export type Order = {
  id: string; store: string; customer: string; pages: number; sla: string;
  placed: string; value: number; status: string;
};

export type Application = {
  id: string; name: string; owner: string; area: string;
  submitted: string; hardware: string; docs: string;
};
