import { Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NgClass } from '@angular/common';
import { Subscribable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);

msgError: string = '';
msgsucc: string = '';
isLoading: boolean = false;
unsub:Subscription=new Subscription();

loginform = this.fb.group({
  email: this.fb.control(null, [Validators.required, Validators.email]),
  password: this.fb.control(null, [
    Validators.required,
    Validators.pattern(/^\w{6,}$/),
  ]),
});


   

  get emailcontroller() { return this.loginform.get('email'); }
  get passwordcontroller() { return this.loginform.get('password'); }
  
  sumbitform(): void {
    if (this.loginform.valid) {
    this.unsub.unsubscribe();
      this.isLoading=true;
    this.unsub=  this.authService.loginForm(this.loginform.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message==='success'){
            this.msgError='';
            this.msgsucc='Successflly Login';

            this.cookieService.set('token',res.token)

            setTimeout(() => {
              this.router.navigate(['/home'])
              
            }, 2000);
          }
          
          this.isLoading=false;
        },
       })

    } else {
      
      this.loginform.markAllAsTouched();
    }
  }
}
