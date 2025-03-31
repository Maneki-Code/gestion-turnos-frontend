import { Component, computed, inject } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroClock, heroPlus } from '@ng-icons/heroicons/outline';
import { AppointmentResponse } from '../../models/responses/appointments.response';
import { AppointmentComponent } from "../appointment/appointment.component";
import { ModalService } from '@app/shared/services/modal.service';
import { SaveAppointmentComponent } from '../save-appointment/save-appointment.component';

@Component({
  selector: 'app-list-appointments',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.scss'],
  providers: [provideIcons({ heroClock, heroPlus })]
})

export class ListAppointmentsComponent {
  private modalService = inject(ModalService);
  private appointmentsService = inject(AppointmentsService);
  appointments = computed(() => this.appointmentsService.signalAppointments());
  date = computed(() => this.appointmentsService.signalDateSelected());
  appointmentsForDate = computed(() => this.appointments().filter(appointment => this.formateDate(appointment.date) === this.date()));
  appointmentSelected = computed(() => this.appointmentsService.signalAppointmentSelected());
  showAppointment:boolean = false;
  showForm:boolean = false;
  constructor() {}

  formateDate(date:String): String {
    return date.split("T")[0];
  }

  returnDay(date: string): string {
    if (!date) return "Día no disponible";
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const dayMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dateObj = new Date(date + "T00:00:00");
    return `${dayNames[dateObj.getDay()]} ${dateObj.getDate()} de ${dayMonths[dateObj.getMonth()]}`;
  }

  showMoreDetails(appointment: AppointmentResponse) {
    this.appointmentsService.signalAppointmentSelected.set(appointment);
    this.modalService.open(AppointmentComponent);
  } 

  showFormToCreateAppointment() {
    this.modalService.open(SaveAppointmentComponent);
  }

}
