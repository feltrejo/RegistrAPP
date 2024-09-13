import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  username: string | null = null;
  isToastOpen: boolean = false;
  toastMessage: string = '';

  constructor(private route: ActivatedRoute, private navCtrl: NavController) {}

  ngOnInit() {
    // Recuperar el nombre de usuario desde localStorage
    this.username = localStorage.getItem('username') || 'Usuario';
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }


  irLogin() {
    this.navCtrl.navigateForward('/login');
  }

  
}


