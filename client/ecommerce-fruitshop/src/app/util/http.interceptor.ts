import { MatDialog } from '@angular/material/dialog';
import { ToastService } from './toast.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private toast: ToastService, private matDialog: MatDialog) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        (event: any) => {
          if (event instanceof HttpResponse) {
            if (event.body?.msg) {
              this.toast.showToastMessage(event.body.msg, 0);
            }
          }
        },
        (error: any) => {
          this.toast.showToastMessage('Error : ' + error.error.msg, 1);
          this.matDialog.closeAll();
        }
      )
    );
  }
}
