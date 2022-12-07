import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BrfParams } from '../_models/brf-params';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BrfCalculatorService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public onCalcBrf(responseData: BrfParams): Observable<BrfParams> {
    return this.http.post<BrfParams>(`${this.host}/calculate`, responseData);
  }
}