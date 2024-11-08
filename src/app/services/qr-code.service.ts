import { Injectable } from '@angular/core';
import * as QRCode from 'qrcode';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {
  constructor() {}

  async generateQRCode(text: string): Promise<string> {
    try {
      return await QRCode.toDataURL(text);
    } catch (error) {
      console.error('Error al generar el código QR', error);
      throw error; // Re-lanzar el error para manejarlo en el componente
    }
  }
}
