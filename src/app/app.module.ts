import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
 // Asegúrate de que esto sea correcto
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { QrCodeService } from './services/qr-code.service';
import { ApiService } from './services/api.service';
import { IonicStorageModule } from '@ionic/storage-angular';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideHttpClient(), QrCodeService,
    ApiService, // Asegúrate de que esté aquí correctamente
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
