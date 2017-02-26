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
  public contact: ContactPage;
  public static pic: any;
  
  constructor(public navCntrl: NavController) {
    
    this.nav = navCntrl;
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 50,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     
     this.contact = new ContactPage();
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
     this.contact.setBase64(this.base64Image);
     var picky = AboutPage.getPic();
     console.log("this is in the about", picky);
     this.contact.setPic(picky);
 //    console.log("image", this.base64Image);
     
    }, (err) => {
     // Handle error
     alert("WHYYYYY");
     console.log(err);
    });
    
  }

  static getPic(){
    return this.pic;
  }

  changePage(){
    console.log("button was clicked");
    this.nav.push(ContactPage);
  }

  static changePic(picky){
    this.pic = picky;
  }

}
