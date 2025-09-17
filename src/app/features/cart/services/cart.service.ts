import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClient=inject(HttpClient);
  private readonly cookieService=inject(CookieService);
  countItem:BehaviorSubject<number>=new BehaviorSubject(0);

  addProductToCart(id:string):Observable<any>{
return this.httpClient.post(environment.baseUrl+"cart",
  {
    productId: id
},
)
  }
  getLoggedUserCart():Observable<any>{
    return this.httpClient.get(environment.baseUrl+'cart',
      
    )
  }
removeSpecificCartItem(id: string): Observable<any> {
  return this.httpClient.delete(environment.baseUrl + `cart/${id}`);
}

updateCartCount(id: string, count: number): Observable<any> {
  return this.httpClient.put(environment.baseUrl + `cart/${id}`, {
    count: count
  });
}

clearAllItems(): Observable<any> {
  return this.httpClient.delete(environment.baseUrl + "cart");
}
  checkOutSeession(id:string,data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`orders/checkout-session/${id}?url=http://localhost:4200`,
      data,
      
    )
  }
  cashOutSeession(id:string,data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`orders/${id}`,
      data,
      
    )
  }
}
