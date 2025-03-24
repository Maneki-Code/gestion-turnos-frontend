import { Component, inject, Input, Signal, computed, effect, signal } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus, heroTrash } from '@ng-icons/heroicons/outline';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ScheduleDayConfigForUpdateDto } from '../../models/schedule-update';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIcon, NgSelectModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss',
  providers: [provideIcons({ heroPlus, heroTrash })]
})
export class DayComponent {
  private scheduleService = inject(ScheduleService);
  private fb = inject(FormBuilder);
  @Input() day!: Signal<ScheduleDayConfigForUpdateDto>;
  
  hours = signal(
    Array.from({length: 24 * 60 / 5}, (_, i) => 
      `${`${Math.floor(i / 12)}`.padStart(2, '0')}:${`${i % 12 * 5}`.padStart(2, '0')}`)
  );

  dayUpdateSignal = computed(() => {
    return this.scheduleService.signalScheduleUpdate().scheduleDays.find(d => d.id === this.day().id)
      ?? {} as ScheduleDayConfigForUpdateDto;
  });

  scheduleDayConfigForm: FormGroup = this.fb.group({
    id: [''],
    startTime: ['', [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)]],
    endTime: ['', [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)]],
    slotInterval: ['', [Validators.required, Validators.min(1), Validators.max(1440)]],
    status: [false],
    rests: this.fb.array([])
  });

  get rests(): FormArray {
    return this.scheduleDayConfigForm.get('rests') as FormArray;
  }

  constructor() {
    effect(() => {
      const updatedDay = this.dayUpdateSignal();
      if (!updatedDay.id) return;
  
      const currentValues = this.scheduleDayConfigForm.value;
  
      const updatedValues: Partial<ScheduleDayConfigForUpdateDto> = {};
  
      if (currentValues.id !== updatedDay.id) {
        updatedValues.id = updatedDay.id;
      }
      if (currentValues.startTime !== this.formatTime(updatedDay.startTime)) {
        updatedValues.startTime = this.formatTime(updatedDay.startTime);
      }
      if (currentValues.endTime !== this.formatTime(updatedDay.endTime)) {
        updatedValues.endTime = this.formatTime(updatedDay.endTime);
      }
      if (currentValues.slotInterval !== updatedDay.slotInterval) {
        updatedValues.slotInterval = updatedDay.slotInterval;
      }
      if (currentValues.status !== !!updatedDay.status) {
        updatedValues.status = !!updatedDay.status;
      }
  
      if (Object.keys(updatedValues).length > 0) {
        this.scheduleDayConfigForm.patchValue(updatedValues);
      }
  
      const currentRests = this.rests.value;
      const updatedRests = updatedDay.rests || [];
  
      if (JSON.stringify(currentRests) !== JSON.stringify(updatedRests)) {
        this.rests.clear();
        updatedRests.forEach(rest => {
          this.rests.push(this.fb.group({
            id: [rest.id || undefined],
            startRest: [this.formatTime(rest.startRest), [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)]],
            endRest: [this.formatTime(rest.endRest), [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)]]
          }));
        });
      }
    });
  }
  

  addRest(): void {
    this.rests.push(this.fb.group({
      id: [undefined],
      startRest: ['', [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)]],
      endRest: ['', [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)]]
    }));
  }

  removeRest(index: number): void {
    this.rests.removeAt(index);
    this.updateDay();
  }

  onSubmit(): void {
    if (this.scheduleDayConfigForm.valid) {
      this.scheduleService.updateSchedule().subscribe({
        next: (data) => console.log(data),
        error: (error) => console.log(error)
      });
    }
  }

  updateDay(): void {
    if (this.scheduleDayConfigForm.valid) {
      this.scheduleService.updateSignal(this.scheduleDayConfigForm.value);
    }
  }

  formatTime(time: any): string {
    if (!time) return '';
    if (typeof time === 'string') return time;
    if (time instanceof Date) {
      return time.toTimeString().slice(0, 5);
    }
    return '';
  }
}
