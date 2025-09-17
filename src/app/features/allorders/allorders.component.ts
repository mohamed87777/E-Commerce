import { Component, OnInit, inject } from '@angular/core';
import { AllordersService } from './services/allorders.service';
import { AuthService } from './../../core/auth/services/auth.service';
import { Orders } from './models/orders.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
  standalone: true,
  imports:[NgClass]
})
export class AllordersComponent implements OnInit {
  private readonly ordersService = inject(AllordersService);
  private readonly authService = inject(AuthService);

  orders: Orders[] = [];

  ngOnInit(): void {
  this.getOrders();
  }
  getOrders():void{
      const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.ordersService.getUserOrders(userId).subscribe({
        next: (res) => {
          console.log(res);
          
          this.orders = res;
        },
        
      });
    }
  }

}
