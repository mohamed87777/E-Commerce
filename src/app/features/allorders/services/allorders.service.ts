import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AllordersService {
  private readonly http = inject(HttpClient);

  getAllOrders(): Observable<any> {
    return this.http.get(environment.baseUrl+'orders');
  }
  getUserOrders(userId: string): Observable<any> {
  return this.http.get(`${environment.baseUrl}orders/user/${userId}`);
}

}
