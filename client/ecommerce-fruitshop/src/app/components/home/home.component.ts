import { ToastService } from './../../util/toast.service';
import { HttpService } from './../../util/http.service';
import { Component, OnInit } from '@angular/core';

type fruits = {
  [key: string]: {
    category: any;
    quantity: any;
    price: any;
    [key: string]: any;
    purchaseQty: 0;
  };
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  fruits: fruits = {};

  constructor(private httpService: HttpService, private toast: ToastService) {}

  async ngOnInit(): Promise<void> {
    this.fruits = await this.httpService.httpreq('GET', '/api');
    for (let key in this.fruits) {
      this.fruits[key]['purchaseQty'] = 0;
    }
  }

  add(item: any) {
    item.value.purchaseQty++;
  }

  remove(item: any) {
    if (item.value.purchaseQty == 0) return;
    item.value.purchaseQty--;
  }

  get showButton() {
    return Object.keys(this.fruits).length > 0;
  }

  async purchase() {
    let purchaseObj: any = {};

    for (let [key, value] of Object.entries(this.fruits)) {
      if (value.purchaseQty > 0) {
        purchaseObj[key] = value.purchaseQty;
      }
    }

    if (Object.keys(purchaseObj).length > 0) {
      await this.httpService.httpreq('POST', '/api/cart', purchaseObj);
    } else {
      this.toast.showToastMessage('Increase Qty atleast for one fruit', 0);
    }
  }
}
