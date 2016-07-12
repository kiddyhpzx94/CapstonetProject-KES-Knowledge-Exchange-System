import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { Control, AsyncPipe  } from '@angular/common';
import { Observable } from '../../../../../../node_modules/rxjs/Observable.d';
import { ChatService }       from '../../../services/chat';

import { ChatRoom } from '../../../interface/chat-room.ts';
import { Message } from '../../../interface/message.ts';
import { Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Routes, RouteSegment } from'@angular/router';
import { AuthService } from '../../../services/auth';

declare var io: any;

@Component({
    selector: 'chat',
    templateUrl: 'client/dev/app/components/front-end/kspace/templates/chat.html',
    styleUrls: ['client/dev/app/components/front-end/kspace/styles/chat.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class ChatComponent {
    @Input('chatRoomId') chatRoomId: string;
    messages: Message[];

    message: Message;
    id: string;
    roleToken: string;
    userToken: string;

    constructor(private _chatService: ChatService, public router: Router, rParam: RouteSegment,
        private _auth: AuthService) {
        this.id = rParam.getParam('rid');
        this.roleToken = localStorage.getItem('role');
        this.userToken = localStorage.getItem('username');

        setInterval(() => {
            this._chatService.getAllMessagesFromChatRoom(this.id).subscribe(
                (messages) => {
                    this.messages = messages;
                });
        }, 2000);
    }

    sendMessage(text: string) {
        this._chatService
            .addMessage(this.id, this.userToken, text)
            .subscribe((r) => {
                //refresh
                this._chatService.getAllMessagesFromChatRoom(this.id).subscribe(
                    (messages) => {
                        this.messages = messages;
                    }
                );
            })
    }

    ngOnInit() {
        this._chatService.getAllMessagesFromChatRoom(this.id).subscribe(
            (messages) => {
                this.messages = messages;
            }
        );
    }

}
