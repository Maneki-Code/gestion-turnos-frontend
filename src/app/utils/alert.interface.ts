export interface Alert {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
  }