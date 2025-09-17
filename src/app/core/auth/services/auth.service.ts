import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  registerForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signup', data);
  }

  loginForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signin', data);
  }

  logOut(): void {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }

  submitVerifyEmail(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `auth/forgotPasswords`, data);
  }

  submitVerifyCode(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `auth/verifyResetCode`, data);
  }

  submitVerifyPassword(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `auth/resetPassword`, data);
  }

getUserIdFromToken(): string | null {
  const token = this.cookieService.get('token'); 
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.id; 
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
}
}


