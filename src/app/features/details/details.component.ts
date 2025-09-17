import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProDetialsService } from './services/pro-detials.service';
import { Product } from '../../core/models/product.interface';
import {
  trigger,
  transition,
  style,
  animate,
  state
} from '@angular/animations';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeImage', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('cartClick', [
      state('default', style({ transform: 'scale(1)' })),
      state('clicked', style({ transform: 'scale(1.1)' })),
      transition('default => clicked', [ animate('150ms ease-in') ]),
      transition('clicked => default', [ animate('150ms ease-out') ])
    ])
  ]
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly proDetialsService = inject(ProDetialsService);

  id: string | null = null;
  prodetials: Product = {} as Product;
  selectedImage: string | null = null;
  isLoading: boolean = true;
  cartClicked: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) this.getProductDetailsData(this.id);
      }
    });
  }

  getProductDetailsData(id: string): void {
    this.isLoading = true;
    this.proDetialsService.getProDetails(id).subscribe({
      next: (res) => {
        this.prodetials = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  addToCart(): void {
    this.cartClicked = true;
    setTimeout(() => this.cartClicked = false, 1000);
  }
  private  readonly cartService=inject(CartService)
  addProductItemToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        
  
      },
      error:(err)=>{
        console.log(err);
        
      }
    } )
  }
  
}
