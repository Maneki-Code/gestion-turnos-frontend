import { Component, ComponentRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from '@app/shared/services/modal.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXCircle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-modal-container',
  imports: [NgIcon],
  providers: [provideIcons({ heroXCircle })],
  template: `
    <div class="modal">
      <div class="modal-header">
        <button class="close-btn" (click)="close()"><ng-icon class="icon icon-medium" name="heroXCircle"></ng-icon></button>
      </div>
      <ng-container #modalContent></ng-container>
    </div>
  `,
  styles: [`
    .modal {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      gap: 16px;
    }
    .modal-header {
      display: flex;
      justify-content: end;
    }
    .close-btn { 
      border: none;
      background: none;
      cursor: pointer; border-radius: 5px;
    }
  `]
})
export class ModalContainerComponent {
  @ViewChild('modalContent', { read: ViewContainerRef, static: true }) 
  modalContent!: ViewContainerRef;

  constructor(private modalService: ModalService) {}

  loadComponent<T>(component: Type<T>) {
    this.modalContent.clear();
    this.modalContent.createComponent(component);
  }

  close() {
    this.modalService.close();
  }
}
