import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }

  //ref =>ref.orderByChild('name')).valueChanges();

  getAll()
  {
    return this.db.list('/categories').valueChanges();

    /*{
      query:  {
      orderByChild = 'name'
    }
  });*/
  }
}
