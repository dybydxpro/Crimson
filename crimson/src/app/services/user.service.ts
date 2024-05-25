import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private collection: any;

  constructor(private db: AngularFireDatabase) {
    this.collection = '/users';
  }

  getUserByUid(uid: string): Observable<any> {
    return this.db.list(this.collection, ref => ref.orderByChild('uid').equalTo(uid)).snapshotChanges()
    .pipe(map((actions: any) => actions.map((action: any) => ({ key: action.key, ...action.payload.val() }))));
  }

  createUser(user: any): any {
    return this.db.list(this.collection).push(user);
  }
}
