import { Injectable } from '@angular/core';
import { Alert } from '@app/utils/alert.interface';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new ReplaySubject<Alert | null>(1);
  alert$ = this.alertSubject.asObservable();

  showSuccess(message: string) {
    this.alertSubject.next({ type: 'success', message });
  }

  showError(message: string) {
    this.alertSubject.next({ type: 'error', message });
  }

  showWarning(message: string) {
    this.alertSubject.next({ type: 'warning', message });
  }

  showInfo(message: string) {
    this.alertSubject.next({ type: 'info', message });
  }

  clear() {
    this.alertSubject.next(null);
  }
}
