import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { PhotoRecord } from '../model/photo-record';
import { PhotoService } from '../services/photo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-present',
  templateUrl: './present.page.html',
  styleUrls: ['./present.page.scss'],
})
export class PresentPage implements OnInit {

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  photos: PhotoRecord[];
  selected: string;

  slideOpts = {
    initialSlide: 1,
    speed: 400,

  };

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.photos = this.photoService.getPhotos();
    this.selected = this.route.snapshot.paramMap.get('id');

    console.log("ID: " + this.selected);
    

    await this.goToSlide();
  }

  async goToSlide() {
    let index = this.photos.findIndex((x) => {
      return x.id == this.selected;
    });

    console.log("INDEX: " + index);
    
    this.slideOpts.initialSlide = index;
    //await this.slides.slideTo(index, 1000, true);
  }
}
