import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Camera } from 'ionic-native';




@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public base64Image: string;
  constructor() {}

    takePicture(){Camera.getPicture({
    destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
    }

}
