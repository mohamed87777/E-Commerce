import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProDetialsService {
  private readonly httpClient =inject(HttpClient);
  

  getProDetails(id:string|null):Observable<any>{
    
return this.httpClient.get(environment.baseUrl+`products/${id}`)
  }
}
