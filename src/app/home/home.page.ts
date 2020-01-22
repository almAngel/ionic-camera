import { Component } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { PhotoService } from '../services/photo.service';
import { ShareService } from '../services/share.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private cameraService: CameraService,
    private photoService: PhotoService,
    private shareService: ShareService,
    private customAlert: AlertController,
    private router: Router
  ) { }

  async takePicture() {
    const photoPath = await this.cameraService.takePicture();
    this.photoService.insertPhoto(photoPath);
  }

  async removePhoto(path: string) {
    let alert = await this.customAlert.create({
      message: "¿Estás seguro de que deseas borrarla?",
      buttons: [
        {
          text: "Si",
          handler: () => {
            this.photoService.removePhoto(path);
          }
        },
        {
          text: "No",
          handler: () => {
            this.customAlert.dismiss();
          }
        },
      ]
    });
    alert.present();
  }

  sharePhoto(path: string) {
    this.shareService.sharePhoto(path);
  }

  async showPreview(id: string) {
    await this.router.navigateByUrl("/present/" + id);
  }

}
