import { FlowbiteService } from './../../../core/services/flowbite.service';
import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
private readonly authservice=inject(AuthService)
private readonly cartService=inject(CartService)



 constructor(private FlowbiteServicevice: FlowbiteService) {}
 
 
@Input({ required: true }) isLogin!: boolean;
 showLogoutModal: boolean = false;

count!:number;
isMobileMenuOpen: boolean = false;
  ngOnInit(): void {
    this.FlowbiteServicevice.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.getCartNumber()
  }
getCartNumber():void{
  this.cartService.countItem.subscribe({
    next:(value)=> {
        this.count=value
    },
  })
}


confirmLogout(): void {
  this.showLogoutModal = true;
}

cancelLogout(): void {
  this.showLogoutModal = false;
}

signOutConfirmed(): void {
  this.authservice.logOut(); 
  this.showLogoutModal = false;
}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
  }

}

