import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckCircle, heroExclamationCircle, heroInformationCircle, heroXCircle } from '@ng-icons/heroicons/outline';
import { Alert } from '@app/utils/alert.interface';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({
    error: heroXCircle, 
    success: heroCheckCircle, 
    warning: heroExclamationCircle, 
    info: heroInformationCircle
  })],
  
  template: `
  @if(alert) {
    <div class="alert" [ngClass]="'alert-' + alert.type" role="alert">
    <ng-icon class="icon-medium" [name]="alert.type"></ng-icon>
      {{ alert.message }}
    </div>
  }`,

  styles: [`
    .alert {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: slideIn 0.3s ease-in-out;
      z-index: 1000;
    }

    .close-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0 5px;
    }

    .alert-success {
      background-color: #d4edda;
      border-color: #c3e6cb;
      color: #155724;
    }

    .alert-error {
      background-color: #f8d7da;
      border-color: #f5c6cb;
      color: #721c24;
    }

    .alert-warning {
      background-color: #fff3cd;
      border-color: #ffeeba;
      color: #856404;
    }

    .alert-info {
      background-color: #cce5ff;
      border-color: #b8daff;
      color: #004085;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `]
})
export class AlertComponent implements OnInit, OnDestroy {
  alert: Alert | null = null;
  private timeout: any;
  private alertService = inject(AlertService);

  ngOnInit() {
    this.alertService.alert$.subscribe(alert => {
      if (alert) {
        this.alert = alert;
        this.timeout = setTimeout(() => {
          this.closeAlert();
        }, 3000);
      }
    });
  }

  ngOnDestroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  closeAlert() {
    this.alert = null;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }


}
