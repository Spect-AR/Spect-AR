import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage {

  user: any;
  userReady: boolean = false;

  constructor(public navCtrl: NavController) {}

  ionViewCanEnter(){
    let env = this;
    NativeStorage.getItem('user')
    .then(function (data){
      env.user = {
        id: data.id,
        name: data.name,
        gender: data.gender,
        picture: data.picture,
      };
        env.userReady = true;
        // get picture:name pairs of this user's friends
        let permissions = ["public_profile", "user_friends"];
        let friendPictures = {};
        
        Facebook.api("/"+data.id+"/friends", permissions)
        .then(function(allFriends) {
            let friends = allFriends.data;

            for (let friend of friends){
                var pictureUrl = "https://graph.facebook.com/" + friend.id + "/picture?width=1000&height=1000";
                friendPictures[pictureUrl] = friend.name;
            }

        }, function (error) {
          alert("this error");
          console.log(error);
        })
    }, function(error){
      console.log(error);
    });
  }

  doFbLogout(){
    var nav = this.navCtrl;
    Facebook.logout()
    .then(function(response) {
      //user logged out so we will remove him from the NativeStorage
      NativeStorage.remove('user');
      nav.push(LoginPage);
    }, function(error){
      console.log(error);
    });
  }


}
