import { Injectable } from '@angular/core';
import { Knowledge } from '../interface/knowledge';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class KnowledgeService {
  private _knowledgesUrl = '/api/knowledges/:id';
  constructor(private _http: Http) { }

  getAllKnowledges(): Observable<Knowledge[]> {
    return this._http.get(this._knowledgesUrl.replace(':id', ''))
      .map((r) => r.json())
      .catch(this.handleError);
  }

  addKnowledge(knowledge: Knowledge): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let _knowledge = JSON.stringify({
    name: knowledge.name,
    description: knowledge.description,
    parent: knowledge.parent,
    });
    return this._http
      .post(this._knowledgesUrl.replace(':id', ''), _knowledge, options)
      .map((r) => r.json());
  }

  deleteKnowledge(id: string): Observable<any> {
    return this._http
      .delete(this._knowledgesUrl.replace(':id', id));

  }

  findKnowledgeById(id: string): Observable<any> {
    return this._http
      .get(this._knowledgesUrl.replace(':id', id))
      .map((r) => r.json());
  }

  updateKnowledge(knowledge: Knowledge): Observable<any> {
    let header = new Headers;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let _knowledge = JSON.stringify({
      name: knowledge.name,
      description: knowledge.description,
    });

    return this._http
      .put(this._knowledgesUrl.replace(':id', knowledge._id), _knowledge, options)
      .map((r) => r.json());
  }

  //get child of a back.knowledge parent
  getChildFromParent(knowledges: Knowledge[]){
    var parent = [];
    var subCate = [];
    for (var i = 0; i < knowledges.length; i++) {
      if (!knowledges[i].hasOwnProperty('parent')) {
        parent.push(knowledges[i]);
      }
    }
    for (var i = 0; i < parent.length; i++) {
      for (var j = 0; j < knowledges.length; j++) {
        if ((knowledges[j].hasOwnProperty('parent')) && (knowledges[j].parent === parent[i]._id)) {
          subCate.push(knowledges[j]);
        }
      }
      parent[i]["subCategory"] = subCate;
      subCate = [];
    }
    knowledges = parent;
    return parent;
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
