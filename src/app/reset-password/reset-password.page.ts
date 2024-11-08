import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../candeactivate.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements CanComponentDeactivate {
  username: string = '';
  
  constructor(private router: Router) {}

  resetPassword() {
    console.log('Contraseña restablecida para', this.username);
    this.router.navigate(['/login']);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return confirm('¿Estás seguro de que deseas abandonar la página de restablecimiento de contraseña sin enviar?');
  }
}
