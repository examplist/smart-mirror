import { fetchStatus, FETCHED, FAILED } from '@/store/auth';

export function sendStorageAuth(): { status: fetchStatus; id: string | null } {
  const status = localStorage.getItem('customer_status');
  const id = localStorage.getItem('customer_id');

  if (!status) {
    localStorage.setItem('customer_status', FAILED);
    return { status: FAILED, id };
  } else if (status === FAILED) {
    return { status: FAILED, id };
  } else {
    return { status: FETCHED, id };
  }
}

export function login(id: string) {
  localStorage.setItem('customer_status', 'fetched');
  localStorage.setItem('customer_id', id);
}

export function logout() {
  localStorage.setItem('customer_status', 'failed');
  localStorage.removeItem('customer_id');
}
