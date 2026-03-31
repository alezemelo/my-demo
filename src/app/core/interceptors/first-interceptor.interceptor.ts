import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { HttpEvent } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const firstInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let token = 'my-auth-token';
  console.log('First before modification:');
  console.log(req);
  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}` // Bearer è uno standard per 
      // l’autenticazione tramite token nelle API HTTP. 
      // Indica che il valore che segue ("my-auth-token" in questo caso) è
      //  un token di accesso che il server deve accettare come “prova” 
      // dell’identità dell’utente. Scrivere Authorization: Bearer ... significa:
      //  “Sto inviando un token di tipo Bearer, usalo per autenticarmi”
    }
  });
  console.log('First after modification:');
  console.log(modifiedReq);
  return next(modifiedReq).pipe(
    tap((evento: HttpEvent<unknown>) => {
      if(evento instanceof HttpResponse){
        console.log('Sono nella pipe');
        console.log(evento);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      // Gestione degli errori HTTP qui. Puoi loggare l'errore, mostrare 
      // una notifica all'utente, o eseguire altre azioni appropriate.
      // I tipi di errori HTTP comuni includono:
      // 400 Bad Request: La richiesta è malformata o contiene dati non validi.
      // 401 Unauthorized: L'autenticazione è richiesta e non è stata fornita o è fallita.
      // 403 Forbidden: L'utente autenticato non ha i permessi necessari per accedere alla risorsa.
      // 404 Not Found: La risorsa richiesta non è stata trovata sul server.
      // 500 Internal Server Error: Si è verificato un errore imprevisto sul server.
      console.error('Error in First Interceptor:', error);
      return throwError(() => error);
    })
  );
};
