import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

export abstract class WsError {

    handleError(error: HttpErrorResponse) {

        let errorMessage: string;

        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${error.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Backend returned Http Status Code ${error.status}, response body was: ${error.error}`;
        }
        // return an observable with a user-facing error message
        return ErrorObservable.create(new Error(errorMessage));
    }
}
