import { Component, OnInit, OnDestroy } from '@angular/core';
import { Request } from '../../../interface/request';
import { RequestService } from '../../../services/requests';
import { AuthService } from '../../../services/auth';
import { KSpaceService } from '../../../services/kspace';

import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from'@angular/router';
//import { ChatComponent } from './chat';

import * as SimpleWebRTC from '../../../../asserts/js/simplewebrtc.js';
import * as $ from 'jquery';

@Component ({
  selector: 'kspace',
  templateUrl:'client/dev/app/components/front-end/kspace/templates/kspace.html',
  styleUrls: ['client/dev/app/components/front-end/kspace/styles/kspace.css'],
  directives: [
     ROUTER_DIRECTIVES
  ]
})

export class KSpaceComponent {
    id: string;
    chatRoomId: string;
    user: string;
    roleToken: string;
    userToken: string;
    sharescrbtn: string = "share screen";

    constructor(
      private _requestService:RequestService,
      public router:Router,
      private route:ActivatedRoute,
      private _kspaceService: KSpaceService
      ) {
      //this.route
      //  .params
      //  .subscribe(params => {
      //    this.id = params['id'];
      //  });
    this.roleToken = localStorage.getItem('role');
    this.userToken = localStorage.getItem('username');
  }


  ngOnInit(): void{
    this.user = localStorage.getItem('username');

    //get chat room by front.kspace id
    //this._chatService.findChatRoomByKSpaceId(this.id).subscribe(
    //      (chatRoom) => {
    //        this.chatRoomId = chatRoom[0]._id;
    //      },
    //      (error) => {
    //        console.log(error);
    //      }
    //    );
    var username = localStorage.getItem('username');
    var room = this.id;
    if(username) {
      var webrtc = new SimpleWebRTC({
        // the element that will hold local video
        localVideoEl: 'localVideo',
        // the element that will hold remote videos
        remoteVideosEl: 'remotesVideos',
        autoRequestMedia: true,
        log: true,
        autoRemoveVideos: true,
        nick: username,
        localVideo: {
          autoplay: true, // automatically play the video stream on the page
          mirror: false, // flip the local video to mirror mode (for UX)
          muted: true // mute local video stream to prevent echo
        }
      });
      webrtc.on('videoAdded', function (video, peer) {
        console.log('video added', peer);
        var remotes = document.getElementById('remotesVideos');
        if (remotes) {
          var container = document.createElement('div');
          container.className = 'videoContainer';
          container.id = 'container_' + webrtc.getDomId(peer);
          container.appendChild(video);

          // suppress contextmenu
          video.oncontextmenu = function () { return false; };

          remotes.appendChild(container);
        }
      });
      webrtc.on('readyToCall', function () {
        // you can name it anything
        if(room){
          console.log("Join "+room+ " success!");
          console.log(webrtc);
          webrtc.joinRoom(room);
        }
      });

      // Extra credit! Hook up screenshare button
      var button = $('#sharescreen'),
        setButton = function (bool) {
          button.text(bool ? 'share screen' : 'stop sharing');
        };
      //
      setButton(true);
      button.click(function () {
        if (webrtc.localScreen) {
          webrtc.stopScreenShare();
          setButton(true);
        } else {
          webrtc.shareScreen();
          setButton(false);
        }
        //    //window.open(window.location.href ,'_blank','width=500, height=400');
      });
    }



    // a peer video has been added

    //this.makeCall(room, webrtc);
  }

  makeCall(room: string, webrtc: SimpleWebRTC) {
    // we have to wait until it's ready

  }
}
