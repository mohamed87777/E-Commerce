import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { WishlistService } from './services/wishlist.service';
import { Product } from '../../core/models/product.interface';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  imports:[NgClass],
  standalone: true,
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);


  private readonly toastrService = inject(ToastrService);

  wishlistItems: Product[] = [];
  

  ngOnInit(): void {
    this.getWishlistItems();
  }

  getWishlistItems(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistItems = res.data;
      },
      error: (err) => {
        console.error('Error loading wishlist:', err);
      }
    });
  }

  toggleWishlist(productId: string): void {
    if (this.isInWishlist(productId)) {
      // ✅ لو موجود → احذفه
      this.wishlistService.removeProductFromWishlist(productId).subscribe({
        next: () => {
          this.wishlistItems = this.wishlistItems.filter((item) => item._id !== productId);
          this.toastrService.info('Removed from wishlist 🖤');
        },
        error: () => {
          this.toastrService.error('Failed to remove ❌');
        }
      });
    }
  }
  addProductItemToCart(productId: string): void {
  this.cartService.addProductToCart(productId).subscribe({
    next: (res) => {
      if (res.status === 'success') {
        this.toastrService.success(res.message, 'Fresh Cart');
      }
    },
    error: () => {
      this.toastrService.error('Something went wrong!');
    }
  });
}


  isInWishlist(productId: string): boolean {
    return this.wishlistItems.some((item) => item._id === productId);
  }
}
