import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './../../../core/models/product.interface';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [NgClass],
})
export class CardComponent implements OnInit {
  @Input({ required: true }) product: Product = {} as Product;

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  private readonly router = inject(Router);

  wishlistIds: string[] = [];

  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistIds = res.data.map((item: any) => item._id);
      },
    
    });
  }

  toggleWishlist(event: Event, productId: string): void {
    event.stopPropagation(); 

    if (this.isInWishlist(productId)) {
      this.wishlistService.removeProductFromWishlist(productId).subscribe({
        next: () => {
          this.wishlistIds = this.wishlistIds.filter((id) => id !== productId);
          this.toastrService.info('Removed from wishlist 🖤');
        },
  
      });
    } else {
      this.wishlistService.addProductToWishlist(productId).subscribe({
        next: () => {
          this.wishlistIds.push(productId);
          this.toastrService.success('Added to wishlist 💚');
        },
     
      });
    }
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistIds.includes(productId);
  }

  goToDetails(productId: string): void {
    this.router.navigate(['/details', productId]);
  }

  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          console.log(res.numOfCartItems);
          
          this.cartService.countItem.next(res.numOfCartItems);
          this.toastrService.success(res.message, 'Fresh Cart');
        }
      },
    
    });
  }
}
