import { Component } from '@angular/core';

@Component({
  selector: 'app-error-route-not-exist',
  imports: [],
  template: `
  <section class="component-container">
    <div class="error-route-not-exist">
        <h2>404 - Pagina no encontrada</h2>
        <p>Perdon, la pagina que usted busca no fue encontrada.</p>
    </div>
  </section>
  `,
  styles: [`
    .component-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .error-route-not-exist {
        text-align: center;
    }

    `]
})
export class ErrorRouteNotExistComponent {

}
