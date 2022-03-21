import { SpinnerComponent } from './../components/spinner/spinner.component';
import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog) {}

  showToastMessage(message: string, type: number) {
    const duration = type ? 5000 : 2500;
    this._snackBar.open(message, 'X', { duration });
  }

  openDialog() {
    this.dialog.open(SpinnerComponent, { hasBackdrop: true });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
