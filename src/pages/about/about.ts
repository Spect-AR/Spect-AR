import { Component } from '@angular/core';

import { Camera } from 'ionic-native';
import { NavController} from 'ionic-angular';
import {ContactPage} from "../contact/contact";



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public base64Image: string;
  public nav: NavController;
  
  constructor(public navCntrl: NavController) {
    this.nav = navCntrl;
    Camera.getPicture({
    destinationType: Camera.DestinationType.DATA_URL,
    quality: 100,
    targetWidth: 10000,
    targetHeight: 10000

    }).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.base64Image = 'data:image/jpeg;base64,' + imageData;

     
    }, (err) => {
     // Handle error
     console.log(err);
    });
    
  }

  getBase(){
    return this.base64Image;
  }

  changePage(){
    this.nav.push(ContactPage);
  }

}
