import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent implements OnInit{
private readonly fb =inject(FormBuilder);
private readonly authService =inject(AuthService);
private readonly cookieService =inject(CookieService);
private readonly router =inject(Router);



  verifyEmail!:FormGroup;
verifyCode!:FormGroup;
step:number=1;
verifyPassword!:FormGroup;
msgError: string = '';
msgsucc: string = '';
isLoading: boolean = false;
unsub:Subscription=new Subscription();
ngOnInit(): void {
    this.initform();

}
initform():void{
  this.verifyEmail=this.fb.group({
    email:[null,[Validators.required,Validators.email]]
  })
  this.verifyCode=this.fb.group({
    resetCode:[null,[Validators.required,Validators.pattern(/^\w{4,10}$/)]]
  })
  
  this.verifyPassword=this.fb.group({
    email:[null,[Validators.required,Validators.email]],
    newPassword:[null,[ Validators.required,
    Validators.pattern(/^\w{6,}$/),]]
  })
}
get emailcontroller() { return this.verifyEmail.get('email'); }
  get passwordcontroller() { return this.verifyPassword.get('newPassword'); }
  get codecontroller() { return this.verifyCode.get('resetCode'); }
formStep1():void{
   this.isLoading=true;
  if(this.verifyEmail.valid){
    this.authService.submitVerifyEmail(this.verifyEmail.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.step=2;
    }
  })
  }
  else {
      
      this.verifyEmail.markAllAsTouched();
    }
          this.isLoading=false;

}
formStep2():void{
   this.isLoading=true;

  if(this.verifyCode.valid){
    this.authService.submitVerifyCode(this.verifyCode.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.step=3;
    }
  })
  }
  else {
      
      this.verifyCode.markAllAsTouched();
    }
          this.isLoading=false;

}
  formStep3():void{
   this.isLoading=true;

    if(this.verifyPassword.valid){
    this.authService.submitVerifyPassword(this.verifyPassword.value).subscribe({
    next:(res)=>{
            this.msgError='';
            this.msgsucc='Successflly Reset Password';
      this.cookieService.set('token',res.token);
              this.router.navigate(['/home'])
              
    

    }
  })
  
  }
  else {
      
      this.verifyPassword.markAllAsTouched();
    }
          this.isLoading=false;

}
}
