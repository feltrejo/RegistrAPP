import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false; // Simula si el usuario está autenticado
  private userRole: string | null = null;

  login(username: string, password: string, role: string): boolean {
    // Validación de credenciales específicas con rol
    if (
      (username === 'Krystian' && password === 'Kd.123456789' && role === 'profesor') || 
      (username === 'Valentina' && password === 'Vc.123456789' && role === 'alumno')
    ) {
      this.isAuthenticated = true;
      this.userRole = role;
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getRole(): string | null {
    return this.userRole;
  }

  logout() {
    this.isAuthenticated = false;
    this.userRole = null;
  }
}
