import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';  // Asegúrate de que esté vacío
  password: string = '';  // Asegúrate de que esté vacío
  role: string = '';      // Asegúrate de que esté vacío
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Limpiar los valores al cargar la página de login
    this.username = '';
    this.password = '';
    this.role = '';
  }

  togglePassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async login() {
    if (this.authService.login(this.username, this.password, this.role)) {
      localStorage.setItem('username', this.username);
      localStorage.setItem('role', this.role);
      this.router.navigate(['/home'], { state: { username: this.username } });
    } else {
      const alert = await this.alertController.create({
        header: 'Datos Incorrectos',
        message: 'Usuario, Contraseña o Rol incorrectos. Por favor, inténtalo de nuevo.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  canDeactivate(): boolean {
    return confirm('¿Estás seguro de que deseas abandonar la página de inicio de sesión?');
  }
}
