import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';



export const firstGuard: CanActivateFn = (route, state) => {
  // In pratica, ti permette di usare il Router per navigare o reindirizzare 
  // l’utente, anche se non sei in una classe ma in una funzione. 
  // È il modo moderno (Angular 15+) per accedere ai servizi tramite dependency 
  // injection fuori dai componenti o servizi classici.
  console.log('firstGuard called for route:', state.url);
  const router = inject(Router);
  const authService = inject(AuthService);
  if(authService.isLogged){
    return true;
  }
  
  return false;

};
