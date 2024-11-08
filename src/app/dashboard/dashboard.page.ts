import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../candeactivate.guard'
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements CanComponentDeactivate {

  
  username: string = '';
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.username = state?.['username'] || 'Usuario';
  }

  canDeactivate(): boolean {
    return confirm('¿Estás seguro que deseas cerrar sesión?');
  
}

logout() {
  if (this.canDeactivate()) {
  this.authService.logout(); // Cerrar sesión
  this.router.navigate(['/login']);
  console.log("Sesion cerrada")
  }
  }
  //irainicio también funciona pero no pregunta antes de ejecutar
  irainicio(){
  this.router.navigate(['/login']);
  }
}
