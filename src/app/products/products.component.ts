import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable, Subscription } from 'rxjs';
//import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products: any[];
  filteredProducts: any[];
  category: string;
  cart$: Observable<ShoppingCart>;
  

  constructor
  (
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    //categoryService: CategoryService
  ) 
    {
           
    }
    async ngOnInit()
    {
      this.cart$ = await this.shoppingCartService.getCart();
      this.populateProducts();
    }

    private populateProducts()
    {
      this.productService
      .getAll().valueChanges()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })

        .subscribe(params => {
          this.category = params.get('category');
          this.applyFilter();         
        });
    }

    private applyFilter()
    {
      this.filteredProducts = (this.category) ? 
      this.products.filter(p => p.category === this.category):
      this.products;
    }

}
