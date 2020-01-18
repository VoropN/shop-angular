import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private snackBar: MatSnackBar) { }

  public showErrorNotification(errorMessage): void {
    this.showNotification(errorMessage, 'error', 'Close');
  }

  public showNotification(message: string, type: string, button): void {
    this.snackBar.open(message, button, {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['notify', `notify-${type}`]
    });
  }

  public handleResponceError(error: HttpErrorResponse, userErrorMessage: string): Observable<never> {
    this.showErrorNotification(userErrorMessage);
    return throwError(error);
  }
}
