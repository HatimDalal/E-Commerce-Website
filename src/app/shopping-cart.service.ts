import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
//import { take } from 'rxjs/operators';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';
//import { take } from 'rxjs-compat/operator/take';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
  
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>>
  {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' +cartId).valueChanges()
      .map((x:any) => new ShoppingCart(x.items));
  }

  async addToCart(product: Product)
  {
    this.updateItem(product,+1);

    //let cartId = await this.getOrCreateCartId();
    /*let items$: Observable<any> = this.getItem(cartId,product.$key);
    let item$$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);
    items$.take(1).subscribe(item =>{
      item$$.update({quantity: (item.quantity || 0) +1 });
    });*/

  /*let item$: Observable<any> = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key).valueChanges();
  let item$$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);
  item$.take(1).subscribe( item => {
    if (item) item$$.update({quantity: item.quantity +1});
    else item$$.set({product: product,quantity: 1});*/
    
     /*if( item === null ) {
        item$$.set({product: product, quantity: 1});
        console.log('adding new product to cart');
    }else{
        item$$.update({quantity: item.quantity + 1});
        console.log('updating exisiting product ');
   }
    });*/
  }

  //Add to cart ends here


  removeFromCart(product: Product)
  {
    this.updateItem(product, -1);
  }

  async clearCart()
  {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' +cartId+ '/items').remove();
  }

  private create()
  {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  private getItem(cartId: string, productId: string)
  {
    return this.db.object('/shopping-carts/' +cartId+ '/items/' +productId).valueChanges();
  }

  private async getOrCreateCartId()
  {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
  }

  


  private async updateItem(product: Product, change:number)
  {
    //This is perfect
    /*let cartId = await this.getOrCreateCartId();
    let item$: Observable<any> = this.getItem(cartId,product.title);
    let item$$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.title);
    item$.take(1).subscribe( item => {
    if (item) item$$.update({quantity: item.quantity +change});
    else item$$.set({product: product,quantity: change});
  });*/
  //Till here
    /*let cartId = await this.getOrCreateCartId();
    let item$: Observable<any> = this.getItem(cartId,product.title);
    let item$$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.title);
    item$.take(1).subscribe( item => {
    if (item) item$$.update({
      title:product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: item.quantity +change});
    else item$$.set({product: product,quantity: change});
  });*/

  let cartId = await this.getOrCreateCartId();
  let item$: Observable<any> = this.getItem(cartId,product.title);
  let item$$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.title);
  item$.take(1).subscribe( item => {
    //let quantity = item.quantity +change;
    //if (quantity === 0 ) item$$.remove();
    //if(item.quantity+change === 0) item$$.remove();
    if (item) item$$.update({
      title:product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity:  item.quantity +change});
    else item$$.set({
      title:product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: change});
});
  }


}
