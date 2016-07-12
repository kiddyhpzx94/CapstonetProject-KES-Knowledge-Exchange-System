import { Injectable } from '@angular/core';
import { Badword } from '../interface/badword';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export  class BadwordService {
  private _badwordsUrl = '/api/badwords/:id';
  constructor(private _http: Http) { }

  getAllBadwords(): Observable<Badword[]> {
    return this._http.get(this._badwordsUrl.replace(':id',''))
      .map((r) => r.json())
      .do(data => console.log("All: " +  JSON.stringify(data)))
      .catch(this.handleError);
  }

  addBadword(badword: Badword):Observable<any>{
    let header = new Headers;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let _badword = JSON.stringify({
      word : badword.word,
    });
    console.log(_badword);
    console.log(header);
    return this._http
              .post(this._badwordsUrl.replace(':id',''),_badword,options)
              .map((r) => r.json());
  }

  deleteBadword(id :string):Observable<any> {
    return this._http
              .delete(this._badwordsUrl.replace(':id',id));
  }

  findBadwordById(id: string):Observable<any> {
    return this._http
              .get(this._badwordsUrl.replace(':id',id))
              .map((r) => r.json());
  }
  updateBadword(badword: Badword):Observable<any>{
    console.log(badword);
    let header = new Headers;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let _badword = JSON.stringify({
      word : badword.word,
    });

    return this._http
              .put(this._badwordsUrl.replace(':id',badword._id),_badword,options)
              .map((r) => r.json());
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
