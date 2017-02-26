import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
// import $ from "jquery";
import * as $ from "jquery";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
    public base64: string;
    public pic: any;

    constructor() {
        // var bytesOfImage1 = 1;
        // var bytesOfImage2 = 1;
        // var faceId1 = this.getFaceId(bytesOfImage1);
        // var faceId2 = this.getFaceId(bytesOfImage2);
        // var response = this.faceVerify(faceId1, faceId2);
        // console.log(response.isIdentical);
        
    }

    setBase64(mes){
        this.base64 = mes;

        var byteArray = this.b64toBlob(this.base64, 1296);
        console.log("HEYHEY");
        console.log(byteArray);
        // alert(this.getFaceId(byteArray));
        alert(this.getFaceId(this.pic));
        var otherUrl = "https://scontent-ord1-1.xx.fbcdn.net/v/t1.0-9/11071501_1566936493564305_5042811042189696337_n.jpg?oh=ba18772bbbfd89daafdd9a4237ef70fc&oe=59467009";
        var picky = this.faceVerify(this.getFaceId(otherUrl), this.getFaceId(otherUrl));
        console.log("WESHOULDDONEHIS", picky.confidence);
        alert(picky.confidence);      
    }
    setPic(pic){
        this.pic = pic;
        console.log(pic);

    }

    /* turn bytes array of image into face ID */
    getFaceId(bytesOfImage) {
        var response;
        var params = {
            // Request parameters
            "returnFaceId": "true",
            "returnFaceLandmarks": "false"
        };
        $.ajax({
            async: false,
            url: "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),
            beforeSend: function(xhrObj) {
                // Request headers
                
                // if(bytesOfImage instanceof String){
                    // console.log(bytesOfImage, 'json');
                console.log("goodie");
                xhrObj.setRequestHeader("Content-Type","application/json");
                // } else{
                
                //     xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                // }
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","2371df3723034c31ad7fa1edcaaef6ec");
                
            },
            type: "POST",
            // Request body
            data: "{\"url\": \""+bytesOfImage+"\"}", // bytesOfImage,
        })
        .done(function(data) {
            response = data[0];
            // faceId = response.faceId;
            // faceId = $.extend({}, response.faceId);
            // return $.extend(true, {}, response.faceId);
        })
        .fail(function() {
            alert("error");
        });
        return response.faceId;
    }

    /* verify whether two faces represented by their face ID belong to the same person */
    faceVerify(faceId1, faceId2) {
        var response;
        $.ajax({
            async: false,
            url: "https://westus.api.cognitive.microsoft.com/face/v1.0/verify",
            beforeSend: function(xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","2371df3723034c31ad7fa1edcaaef6ec");
            },
            type: "POST",
            // Request body
            data: "{\"faceId1\": \"" + faceId1 + "\", \"faceId2\": \"" + faceId2 + "\"}",
        })
        .done(function(data) {
            response = data;
        })
        .fail(function() {
            response = null;
            alert("error");
        });
        return response;
    }

    faceSearch(needleImageBytes, users) {
        let needleFaceId = this.getFaceId(needleImageBytes);
        let haystackFaceIds = [];
        for (let user of users) {
            let haystackFaceId = this.getFaceId(user.picture);
            haystackFaceIds.push(haystackFaceId);
        }
        let responses = [];
        for (let haystackFaceId of haystackFaceIds) {
            let response = this.faceVerify(needleFaceId, haystackFaceId);
            responses.push(response);
        }
        let maxConfidenceUser = null;
        let maxConfidenceValue = 0.0;
        for (let userIndex = 0; userIndex < users.length; userIndex ++) {
        // for (let response of responses) {
            let response = responses[userIndex];
            if (response.isIdentical == true) {
                if (maxConfidenceValue < response.confidence) {
                    maxConfidenceValue = response.conficence;
                    maxConfidenceUser = users[userIndex];
                }
            }
        }
        return maxConfidenceUser;
    }

    b64toBlob(b64Data, sliceSize) {
        sliceSize = sliceSize || 512;
        
        var byteCharacters = b64Data;
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      return byteArray;
    }
}
