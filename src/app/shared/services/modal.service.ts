import { inject, Injectable, Type, ComponentRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalContainerComponent } from '@app/shared/components/modal-container/modal-container.component';

interface ModalConfig {
  width?: string;
  hasBackdrop?: boolean;
  disableClose?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private overlayRef?: OverlayRef;
  private overlay = inject(Overlay);

  open<T>(component: Type<T>, config: ModalConfig = {}) {
    console.log("Intentando abrir modal con contenido:", component.name);

    this.overlayRef = this.overlay.create({
      width: config.width || '500px',
      hasBackdrop: config.hasBackdrop !== false,
      backdropClass: 'modal-backdrop',
      panelClass: 'modal-panel',
    });

    const portal = new ComponentPortal(ModalContainerComponent);
    const modalComponentRef: ComponentRef<ModalContainerComponent> = this.overlayRef.attach(portal);

    modalComponentRef.instance.loadComponent(component);

    if (!config.disableClose) {
      this.overlayRef.backdropClick().subscribe(() => this.close());
    }
  }

  close() {
    this.overlayRef?.dispose();
  }
}
