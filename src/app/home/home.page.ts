import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QrCodeService } from '../services/qr-code.service';
import { ApiService } from '../services/api.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular'; // Importar AlertController

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  image: string | undefined;
  username: string = '';
  role: string = '';
  qrCodeImage: string | null = null;
  apiData: any = null;
  asistenciaImageURL: string = 'https://imgur.com/f1r109S'; // URL de la imagen

  constructor(
    private router: Router, 
    private qrCodeService: QrCodeService,
    private apiService: ApiService,
    private alertController: AlertController // Inyectar AlertController
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('role') || '';
    this.loadApiData();
  }

  loadApiData() {
    this.apiService.getPresentUsers().subscribe(
      data => {
        this.apiData = data;
        console.log('Datos de la API recibidos', data);
      },
      error => {
        console.error('Error al obtener los datos de la API', error);
      }
    );
  }

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.image = image.dataUrl;
  }

  async generarCodigoQR() {
    try {
      const qrData = `Usuario: ${this.username}, Rol: ${this.role}`;
      this.qrCodeImage = await this.qrCodeService.generateQRCode(qrData);
    } catch (error) {
      console.error('Error al generar el código QR', error);
      // Puedes mostrar un mensaje de error al usuario aquí si lo deseas
    }
  }

  // Método para confirmar el logout con un AlertController
  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel', // Si el usuario cancela, no hace nada
          handler: () => {
            console.log('Logout cancelado');
          }
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.logout(); // Llamar al método de logout si el usuario confirma
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    // Borrar los datos de sesión del localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    // Redirigir al login
    window.location.reload();
  }
}
