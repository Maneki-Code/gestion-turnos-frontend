import { Component, computed, inject } from '@angular/core';
import { ModalService } from '@app/shared/services/modal.service';
import { AppointmentsService } from '../../services/appointments.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-save-appointment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './save-appointment.component.html',
  styleUrl: './save-appointment.component.scss'
})
export class SaveAppointmentComponent {
  private appointmentsService = inject(AppointmentsService);
  private modalService = inject(ModalService);
  date = computed(() => this.appointmentsService.signalDateSelected());
  formSaveAppointment = new FormGroup({
    hour: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dni: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });
}
