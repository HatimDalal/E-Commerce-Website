import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  //products : {title: string}[];
  products: any[];
  filteredProducts : any[];
  subscription : Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().valueChanges()
    .subscribe(products => this.filteredProducts = this.products = products);
   }

   filter(query:string){
     console.log(query);
     this.filteredProducts = (query) ?
     this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
     this.products; 
   }


   ngOnDestroy()
   {
      this.subscription.unsubscribe();
   }


  ngOnInit() {
  }

}
