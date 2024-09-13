import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { Authenticationrequest } from './param/AuthenticationRequest';
import { Router } from '@angular/router';
import { RegistrationRequest } from './param/RegistrationRequest';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  screen: any = 'signin';
  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;
  forgotPasswordFormGroup: FormGroup;
  isLoading: boolean = false;
  isToastOpen: boolean = false;
  toastMessage = "Bienvenido a RegistrAPP";
  

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private navCtrl: NavController
  ) {
    this.loginFormGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.registerFormGroup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      entityNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });

    this.forgotPasswordFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() { }

  change(event: any) {
    this.screen = event;
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  login() {
    const request: Authenticationrequest = new Authenticationrequest(
      this.loginFormGroup.get("username")?.value,
      this.loginFormGroup.get("password")?.value
    );
  
    if (this.loginFormGroup.valid) {
      this.isLoading = true; // Mostrar el loading
  
      this.authenticationService.userLogin(request).then(() => {
        // Verificar autenticación después de iniciar sesión
        if (this.authenticationService.isAuthenticated()) {
          this.router.navigate(['/welcome', { username: this.loginFormGroup.get("username")?.value }]); // Redirigir con el nombre de usuario
        }
      }).catch(error => {
        // Manejo de errores aquí
        console.error("Login error:", error);
        this.isLoading = false; // Ocultar el loading si ocurre un error
      });
    }
  }
  

  register() {
    if (this.registerFormGroup.valid) {
      if (this.registerFormGroup.get('password')?.value !== this.registerFormGroup.get('confirmPassword')?.value) {
        this.toastMessage = "Confirm Password is not the same as the password you provided.";
        this.setOpen(true);
        return;
      }

      const request: RegistrationRequest = new RegistrationRequest(
        this.registerFormGroup.get('firstName')?.value,
        this.registerFormGroup.get('lastName')?.value,
        this.registerFormGroup.get('entityNumber')?.value,
        this.registerFormGroup.get('email')?.value,
        this.registerFormGroup.get('mobile')?.value,
        this.registerFormGroup.get('username')?.value,
        this.registerFormGroup.get('password')?.value
      );

      this.authenticationService.userRegister(request).then((data: any) => {
        this.toastMessage = data;
        this.setOpen(true);
      });
    }
  }

  irWelcome() {
    // Guardar el nombre de usuario en localStorage
    const username = this.loginFormGroup.get('username')?.value;
    localStorage.setItem('username', username);

    // Navegar a la página de bienvenida
    this.router.navigate(['/welcome']);
  }

  irLogin() {
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  restartApp() {
    // Redirige a la página de inicio de sesión y recarga la página
    this.navCtrl.navigateRoot('/login').then(() => {
      // Timeout added to ensure that the navigation completes before reloading
      setTimeout(() => {
        window.location.reload();
      }, 300);
    });
  }

}
