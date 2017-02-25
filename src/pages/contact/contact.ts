import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// import $ from "jquery";
import * as $ from "jquery";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

    constructor(public navCtrl: NavController) {
        /* turn bytes array of image into face ID */
        var getFaceId = function(bytesOfImage) {
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
                    xhrObj.setRequestHeader("Content-Type","application/json");
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","2371df3723034c31ad7fa1edcaaef6ec");
                },
                type: "POST",
                // Request body
                data: "{\"url\": \"https://scontent-ord1-1.xx.fbcdn.net/v/t1.0-9/11071501_1566936493564305_5042811042189696337_n.jpg?oh=ba18772bbbfd89daafdd9a4237ef70fc&oe=59467009\"}", // bytesOfImage,
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
        var faceVerify = function(faceId1, faceId2) {
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
                alert("error");
            });
            return response.isIdentical;
        }

        var bytesOfImage1 = 1;
        var bytesOfImage2 = 1;
        var faceId1 = getFaceId(bytesOfImage1);
        var faceId2 = getFaceId(bytesOfImage2);
        var isIdentical = faceVerify(faceId1, faceId2);
        console.log(isIdentical);
    }
}
