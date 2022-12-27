import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Price } from 'src/models/price';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  constructor(private http: HttpClient) {}

  getAllPrices(): Observable<Price[]> {
    return this.http.get<Price[]>('/api/prices');
  }

  getLatestPrice(instrument: string): Observable<any> {
    let params = new HttpParams().set('instrument', instrument);
    return this.http.get<any>('/api/price', { params });
  }
}
