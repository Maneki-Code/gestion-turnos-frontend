import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { heroEye, heroEyeSlash, heroLockClosed } from '@ng-icons/heroicons/outline';
import { ConfigService } from '../../services/config.service';
import { ChangePasswordDto } from '../../models/changePasswordDto.dto';
import { StatusButton } from '@app/utils/types';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, CommonModule, NgIcon],
  providers: [provideIcons({ heroEyeSlash, heroEye, heroLockClosed})],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  private _config = inject(ConfigService);
  private fb = inject(FormBuilder);
  protected statusButtonOne: StatusButton = 'hidePassword';
  protected statusButtonTwo: StatusButton = 'hidePassword';
  protected statusButtonThree: StatusButton = 'hidePassword';
  form: FormGroup = this.fb.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
    newPasswordRepeat: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
  })

  changePassword(){
    if(this.form.valid){
      if(this.form.value.newPassword !== this.form.value.newPasswordRepeat){
        alert('Las contraseñas no coinciden papu');
        return;
      }

      const request: ChangePasswordDto = {
        newPassword: this.form.value.newPassword,
        oldPassword: this.form.value.oldPassword
      }

      this._config.changePassword(request).subscribe({
        next: () => alert('Nueva contraseña perfecta padre'),
        /* manejo de errores */
      })
    }
  }

  showPassword(number: number) {
    switch (number) {
      case 1:
        this.statusButtonOne = this.statusButtonOne === 'showPassword' ? 'hidePassword' : 'showPassword';
        break;
      case 2:
        this.statusButtonTwo = this.statusButtonTwo === 'showPassword' ? 'hidePassword' : 'showPassword';
        break;
      case 3:
        this.statusButtonThree = this.statusButtonThree === 'showPassword' ? 'hidePassword' : 'showPassword';
        break;
      default:
        console.warn("Número inválido:", number);
    }
  }
  
}
