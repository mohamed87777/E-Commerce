import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  FormBuilder
} from '@angular/forms';
import { error } from 'console';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule ,NgClass,RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
  private readonly fb = inject(FormBuilder);
unsub:Subscription=new Subscription();
msgError: string = '';
msgsucc: string = '';
isLoading: boolean = false;

registerform = this.fb.group(
  {
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  },
  { validators: this.passwordMatchValidator }
);


   passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    return password === rePassword ? null : { passwordMismatch: true };
  }

  get namecontroller() { return this.registerform.get('name'); }
  get emailcontroller() { return this.registerform.get('email'); }
  get passwordcontroller() { return this.registerform.get('password'); }
  get rePasswordcontroller() { return this.registerform.get('rePassword'); }
  get phonecontroller() { return this.registerform.get('phone'); }

  sumbitform(): void {
    if (this.registerform.valid) {
      this.unsub.unsubscribe();
      this.isLoading=true;

     this.unsub= this.authService.registerForm(this.registerform.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message==='success'){
            this.msgError='';
            this.msgsucc='Successflly Register';
            setTimeout(() => {
              this.router.navigate(['/login'])
              
            }, 2000);
          }
          
          this.isLoading=false;
        },
      
      })

    } else {
      
      this.registerform.markAllAsTouched();
    }
  }
}
