import { ToastService } from './toast.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private toast: ToastService) {}

  async httpreq(method: string, url: string, body?: any) {
    let response: any;

    this.toast.openDialog();

    if (method == 'GET') {
      response = await this.http.get(url).toPromise();
    }
    if (method == 'POST') {
      response = await this.http.post(url, body).toPromise();
    }

    if (response) {
      this.toast.closeDialog();
      return response;
    }

    this.toast.closeDialog();
  }
}
