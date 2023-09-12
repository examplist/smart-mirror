export const FAILED = 'failed';
export const FETCHED = 'fetched';
export type fetchStatus = 'fetched' | 'failed' | null;

import { create } from 'zustand';

export interface AuthStore {
  customer_status: fetchStatus;
  customer_id: string | null;

  admin_status: fetchStatus;
  admin_id: string | null;

  setCustomer: (
    customer_status: fetchStatus,
    customer_id: string | null
  ) => void;

  setAdmin: (admin_status: fetchStatus, admin_id: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  customer_status: null,
  customer_id: null,

  admin_status: null,
  admin_id: null,

  setCustomer: (customer_status: fetchStatus, customer_id: string | null) => {
    set(() => ({ customer_status, customer_id }));
  },

  setAdmin: (admin_status: fetchStatus, admin_id: string | null) => {
    set(() => ({ admin_status, admin_id }));
  },
}));
