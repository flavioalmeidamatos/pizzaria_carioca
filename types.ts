export interface User {
  id: string;
  name: string;
  role: 'admin' | 'staff';
}

export type ViewState = 'login' | 'dashboard';

export interface DashboardStat {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
}

// Changed dl=0 to raw=1 to ensure images render directly in <img> tags
export const LOGO_URL = "https://www.dropbox.com/scl/fi/qegqz7xhpk54bfh4ravxm/PIZZARIA-CARIOCA.png?rlkey=s85el2fdslfxcm42ekk4v9fh2&raw=1";
export const PRELOADER_URL = "https://www.dropbox.com/scl/fi/9gma9fj7lve5q529gvw6d/PRELOADER.png?rlkey=coz0x43n6urgtclboeas7zdqx&raw=1";