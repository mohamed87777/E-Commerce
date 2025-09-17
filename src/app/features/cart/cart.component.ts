import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart.interface';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [RouterLink]
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private  readonly toastrService=inject(ToastrService);
  
  cartDetials?: Cart;

  ngOnInit(): void {
    this.getLoggedUserData();
  }

  getLoggedUserData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetials = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  removeItem(id: string): void {
  this.cartService.removeSpecificCartItem(id).subscribe({
    next: (res) => {
      if (res.status === 'success') {
        this.toastrService.success('Product Removed 🗑️');
        this.cartDetials = res.data;

        const count = res.numOfCartItems || res.data?.products?.length || 0;
        this.cartService.countItem.next(count);
      }
    },
    error: () => {
      this.toastrService.error('Failed to remove product');
    }
  });
}

updateCount(id: string, count: number): void {
  if (count < 1) return; 
  this.cartService.updateCartCount(id, count).subscribe({
    next: (res) => {
      this.cartDetials = res.data;
      this.toastrService.info('Cart updated 🛒');

      const updatedCount = res.numOfCartItems || res.data?.products?.length || 0;
      this.cartService.countItem.next(updatedCount);
    },
    error: () => {
      this.toastrService.error('Failed to update cart');
    }
  });
}

  clearAll(){
    this.cartService.clearAllItems().subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetials = res.data;

    this.cartService.countItem.next(0)      
      
      }
    })
  }
}
