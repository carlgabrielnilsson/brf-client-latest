import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Feedback } from '../_models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  
  public onFeedbackSubmit(responseData: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.host}/feedback`, responseData);
  }
}