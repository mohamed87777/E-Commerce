import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);

id:string|null=null;
  checkOutForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }
  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(UrlParams)=>{
      this.id=  UrlParams.get('id')
      }
    })
  }


  initForm(): void {
    this.checkOutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city: [null, [Validators.required]]
      })
    });
  }

  get detailsControl() {
    return this.checkOutForm.get('shippingAddress.details');
  }
  get phoneControl() {
    return this.checkOutForm.get('shippingAddress.phone');
  }
  get cityControl() {
    return this.checkOutForm.get('shippingAddress.city');
  }

  submitVisa(): void {
  if (this.checkOutForm.valid && this.id) {
    this.cartService.checkOutSeession(this.id, this.checkOutForm.value).subscribe({
      next: (res) => {
        console.log('💳 Visa response:', res);
        if (res.status === 'success') {
          window.open(res.session.url, '_self'); // يفتح صفحة الدفع
        }
      },
      error: (err) => console.error(err)
    });
  } else {
    this.checkOutForm.markAllAsTouched();
  }
}

submitCash(): void {
  if (this.checkOutForm.valid && this.id) {
    this.cartService.cashOutSeession(this.id, this.checkOutForm.value).subscribe({
      next: (res) => {
        console.log('💵 Cash response:', res);
        if (res.status === 'success') {
          window.open('/allorders', '_self'); 
        }
      },
      error: (err) => console.error(err)
    });
  } else {
    this.checkOutForm.markAllAsTouched();
  }
}

}
