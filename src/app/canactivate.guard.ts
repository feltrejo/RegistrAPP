import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../app/service/auth.service';
@Injectable({
providedIn: 'root',
})
export class canActivate implements CanActivate {
constructor(private authService: AuthService, private router: Router) {}
canActivate(): boolean {
if (this.authService.isLoggedIn()) {
return true;
} else {
this.router.navigate(['/dashboard']);
return false;
}
}
}