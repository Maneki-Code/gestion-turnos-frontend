import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertService } from '@app/shared/services/alert.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
  template: `
  <div class="dashboard">
  <router-outlet></router-outlet>
  </div>
  `,
  styles: [`
    .dashboard {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    padding: 16px;
    border: 1px solid var(--border);
    background-color: var(--background);
    
}`],
  standalone: true
})

export class DashboardComponent {
  private alertService = inject(AlertService);
}
