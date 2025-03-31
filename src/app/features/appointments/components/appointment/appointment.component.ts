import { Component, computed, inject } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { ModalService } from '@app/shared/services/modal.service';

@Component({
  selector: 'app-appointment',
  template: `
  <section class="appointment-container">
    <div class="info-appointment">
        <p>{{appointment()?.startTime}}</p>
        <p>{{appointment()?.customer?.firstName}}, {{appointment()?.customer?.lastName}}</p>
        <p>{{appointment()?.description}}</p>
        <p>{{appointment()?.status}}</p>
    </div>
  </section>  
    `,
  styles: `
    .appointment-container{
        display: flex;
        justify-content: space-between;
        align-items: start;
        gap: 16px;
        padding: 16px;
        border-radius: 8px;
        height: 300px;
        width: 300px;
        background-color: var(--muted);
    }
    .info-appointment{
        display: flex;
        flex-direction: column;
        gap: 8px;
        color: var(--foreground);
    }
  `,
})
export class AppointmentComponent {
  appointmentsService = inject(AppointmentsService);
  modalService = inject(ModalService);
  appointment = computed(() => this.appointmentsService.signalAppointmentSelected());

  closeAppointmentEvent() {
    this.appointmentsService.signalAppointmentSelected.set(null);
    this.modalService.close();
  }
}
