import { HttpInterceptorFn } from '@angular/common/http';

export const secondInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  if(!req.headers.has('Content-Type')){
    console.warn('Second Interceptor: No Content-Type header found');
    const modifiedReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json' // Imposta il tipo di contenuto a JSON
        //  se non è già presente nella richiesta. Questo è importante perché 
        // molte API si aspettano che i dati siano inviati in formato JSON, e 
        // senza questo header, la richiesta potrebbe essere rifiutata o non 
        // elaborata correttamente.
      }
    });
    console.log('Second Interceptor: Request modified with Content-Type header');
    console.log(modifiedReq);
    return next(modifiedReq);

  }
  
  
  console.log('Second Interceptor: Request is on its way');
  return next(req);
};
