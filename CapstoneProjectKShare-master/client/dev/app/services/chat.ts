import { Injectable } from '@angular/core';
import { ChatRoom } from '../interface/chat-room';
import { Message } from '../interface/message';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {

    constructor(private _http: Http) { }
    private _messageUrl = '/api/messages/:id';
    private _chatRoomUrl = '/api/chat-rooms/:id';

     //messages: Observable<Message[]>;

    getAllMessagesFromChatRoom(id: string): Observable<any> {
        return this._http.get(this._messageUrl.replace(':id', id))
            .map((r) => r.json())
            .catch(this.handleError);
    }

    getChatRoomById(id: string): Observable<ChatRoom> {
        return this._http.get(this._chatRoomUrl.replace(':id', id))
            .map((r) => r.json())
            .catch(this.handleError);
    }

    addMessage(chatRoomId: string, user: string, text: string): Observable<any> {
        let header = new Headers;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let _message = JSON.stringify({
            chatRoomId: chatRoomId,
            user: user,
            content: text
        });
        console.log(_message);
        return this._http
            .post(this._messageUrl.replace(':id', ''), _message, options)
            .map((r) => r.json());
    }

    addChatRoom(kshare: string): Observable<any> {
        let header = new Headers;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let _message = JSON.stringify({
            name: "ChatRoom",
            kSpaceId: kshare
        });
        return this._http
            .post(this._chatRoomUrl.replace(':id', ''), _message, options)
            .map((r) => r.json());
    }

    findChatRoomByKSpaceId(id: string): Observable<any> {
        let header = new Headers;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let _message = JSON.stringify({

        });
        return this._http
            .post(this._chatRoomUrl.replace(':id', id), _message, options)
            .map((r) => r.json());
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
