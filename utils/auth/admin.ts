import { fetchStatus, FETCHED, FAILED } from '@/store/auth';

export function sendStorageAuth(): { status: fetchStatus; id: string | null } {
  const status = localStorage.getItem('admin_status');
  const id = localStorage.getItem('admin_id');

  if (!status) {
    localStorage.setItem('admin_status', FAILED);
    return { status: FAILED, id };
  } else if (status === FAILED) {
    return { status: FAILED, id };
  } else {
    return { status: FETCHED, id };
  }
}

export function login(id: string) {
  localStorage.setItem('admin_status', FETCHED);
  localStorage.setItem('admin_id', id);
}

export function logout() {
  localStorage.setItem('admin_status', FAILED);
  localStorage.removeItem('admin_id');
}
