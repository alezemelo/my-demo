# MyDemo

Questo è un progetto in Angular CLI version 19.2.22.


## Struttura del progetto

Questa versione dell'applicazione è organizzata in questo modo:

- `src/` contiene tutto il codice dell'applicazione.
	- `index.html`, `main.ts`, `main.server.ts`, `server.ts`, `styles.css` e la cartella `environments/` per le configurazioni.
- `src/app/` è la radice dell'app Angular e contiene:
	- `app.component.*`: il componente principale.
	- `app.config.ts` e `app.config.server.ts`: configurazione globale e server-side.
	- `app.routes.ts` e `app.routes.server.ts`: definizione delle route client e server.
	- `core/`: funzionalità condivise e di base dell'applicazione:
		- `components/menu/`: componente di navigazione principale (menu).
		- `guards/`: guardie di routing (es. autenticazione).
		- `interceptors/`: http interceptor personalizzati.
		- `services/`: servizi condivisi (es. autenticazione).
	- `products/`: feature Products:
		- `components/`: componenti UI (table, page, details, observable, ecc.).
		- `models/`: modelli TypeScript (es. `product.ts`).
		- `pipes/`: pipe personalizzate.
		- `services/`: servizi Angular per i prodotti e offerte.
	- `randomUsers/`: feature utenti random:
		- `components/user-card/`: componente per la visualizzazione utente.
		- `models/`: modello utente random.
		- `pages/random-users-page/`: pagina utenti random.
		- `services/`: servizi per utenti random.
	- `shared/`: componenti condivisi:
		- `not-found/`: pagina di errore 404.
		- `welcome/`: pagina di benvenuto.
- `public/` ospita asset statici (es. favicon).
- File di configurazione e build: `angular.json`, `package.json`, `tsconfig*.json`, ecc.

## Navigazione e Routing

L'applicazione utilizza il sistema di routing di Angular per gestire la navigazione tra le varie pagine. Il menu di navigazione principale si trova in `src/app/core/components/menu/` e utilizza le direttive `routerLink` per spostarsi tra le route definite.

Le route principali sono definite in `src/app/app.routes.ts` e permettono di accedere alle seguenti pagine:

- `/products` — Pagina dei prodotti
- `/users` — Pagina degli utenti
- `/second-observable` — Esempio con Observable
- `/welcome` — Pagina di benvenuto (default)
- Qualsiasi altro percorso non definito mostra la pagina Not Found

Esempio di utilizzo di `routerLink` nel menu:

```html
<a [routerLink]="['/products']">Products</a>
<a [routerLink]="['/users']">Users</a>
<a [routerLink]="['/second-observable']">Second Observable</a>
<a [routerLink]="['/welcome']">Welcome</a>
```

Il routing consente di caricare in modo lazy i componenti delle varie pagine, migliorando le performance e la struttura modulare dell'applicazione.

## Comandi Angular CLI

Creazione progetto:

```bash
ng new my-app-name
```

Generazione artefatti:

```bash
ng generate component nome-componente
ng generate directive nome-direttiva
ng generate pipe nome-pipe
ng generate service nome-servizio
ng generate class nome-classe
ng generate interface nome-interfaccia
ng generate enum nome-enum
ng generate guard nome-guard
```

Build, serve, lint, test:

```bash
ng build
ng serve
ng lint
ng test
```

## Avvio applicazione

Per far partire l'app:

```bash
npm install
```

Avvia il fake server (mock API):

```bash
npx json-server db.json -p 7000 -d 1000
```

In un altro terminale avvia Angular:

```bash
ng serve -o
```

## Mock API (json-server)

Al momento il progetto usa un database mockato con `json-server`:

- https://www.npmjs.com/package/json-server

Per far girare l'app, è necessario avviare il fake server dalla cartella che contiene `db.json`:

```bash
npx json-server db.json -p 7000 -d 1000
```

Dove `-p` indica la porta e `-d` il delay (in ms).

Il file `db.json` deve avere questo contenuto minimo:

```json
{
	"products": [
		{
			"id": 1,
			"price": 50,
			"description": "Product 1",
			"releaseDate": "2026-03-27T00:00:00.000Z",
			"imageUrl": "https://example.com/product1.jpg"
		},
		{
			"id": 2,
			"price": 100,
			"description": "Product 2",
			"releaseDate": "2026-03-27T00:00:00.000Z",
			"imageUrl": "https://example.com/product2.jpg"
		},
		{
			"id": 3,
			"price": 150,
			"description": "Product 3",
			"releaseDate": "2026-03-27T00:00:00.000Z",
			"imageUrl": "https://example.com/product3.jpg"
		}
	]
}
```

## HttpClient

`HttpClient` è il servizio di Angular che permette di effettuare richieste HTTP (GET, POST, PUT, DELETE, ecc.) verso API REST o altri endpoint web in modo semplice, tipizzato e reattivo (tramite Observable). Si usa per comunicare con backend, recuperare o inviare dati e integrare servizi esterni.

Nel caso di questo progetto, le chiamate `HttpClient` (ad esempio le GET per recuperare i prodotti) vengono effettuate verso il backend mock fornito da **json-server**, che espone le API locali definite nel file `db.json`.

In questo progetto, `HttpClient` viene abilitato e configurato tramite il file `src/app/app.config.ts` usando la funzione `provideHttpClient`.

Oltre all'abilitazione base, qui vengono anche registrati gli **HttpInterceptor** tramite la funzione `withInterceptors`, così tutte le richieste HTTP passano attraverso la catena di interceptor definiti.

Esempio reale di configurazione:

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstInterceptorInterceptor } from './core/interceptors/first-interceptor.interceptor';
import { secondInterceptorInterceptor } from './core/interceptors/second-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideHttpClient(
			withInterceptors([
				firstInterceptorInterceptor,
				secondInterceptorInterceptor
			])
		),
		// altri provider...
	]
};
```

In questo modo, tutte le richieste HTTP effettuate tramite `HttpClient` sono automaticamente intercettate dagli interceptor definiti in `src/app/core/interceptors/`.

### Esempi di utilizzo di HttpClient nel codice

Ecco alcuni esempi reali di come viene usato `HttpClient` nel progetto per effettuare chiamate HTTP verso json-server:

**Esempio di chiamata GET per ottenere la lista dei prodotti:**

File: `src/app/products/services/products.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductsService {
	constructor(private httpClient: HttpClient) {}

	getProductFromApi(): Observable<Product[]> {
		return this.httpClient.get<Product[]>('http://localhost:7000/products');
	}
}
```

**Esempio di utilizzo in un componente per ricevere i dati:**

File: `src/app/products/components/product-page/product-page.component.ts`

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';

@Component({
	selector: 'app-product-page',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {
	products: Product[] = [];
	subscriptionProducts?: Subscription;

	constructor(private service: ProductsService) {}

	ngOnInit(): void {
		this.subscriptionProducts = this.service.getProductFromApi().subscribe(
			x => this.products = x
		);
	}

	ngOnDestroy(): void {
		this.subscriptionProducts?.unsubscribe();
	}
}
```

## Concetti chiave

### @Input e @Output

- `@Input()` permette a un componente figlio di ricevere dati dal componente padre tramite binding in template.
- `@Output()` espone un evento dal componente figlio al padre usando un `EventEmitter`.

Esempio minimale:

```ts
// child.component.ts
@Input() titolo = '';
@Output() salvato = new EventEmitter<void>();
```

```html
<!-- parent.component.html -->
<app-child [titolo]="titoloPagina" (salvato)="onSalvato()"></app-child>
```

### Observable

Gli `Observable` (RxJS) rappresentano flussi di dati asincroni. Si usano spesso per HTTP, eventi UI e stream di stato.

- Si sottoscrivono con `subscribe()`.
- Possono essere trasformati con operatori come `map`, `filter`, `switchMap`.
- Nel template si preferisce la `async` pipe per gestire la sottoscrizione automaticamente.

Esempi presenti nel progetto:

- Creazione di uno stream con `of()` e sottoscrizione in [src/app/products/components/osservable-component/osservable-component.component.ts](src/app/products/components/osservable-component/osservable-component.component.ts#L11-L18).

```ts
const myObservaable = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
const myObserverm = {
	next: (value: number) => console.log(value),
	error: (err: any) => console.error('Error:', err),
	complete: () => console.log('Stream completato')
};
const mySubscription = myObservaable.subscribe(myObserverm);
```

- Uso di `range()` con `pipe()` e operatori `map`/`filter` in [src/app/products/components/second-osservable-component/second-osservable-component.component.ts](src/app/products/components/second-osservable-component/second-osservable-component.component.ts#L18-L24).

```ts
const sorgente$: Observable<number> = range(0,10);
sorgente$.pipe(
	map((n) => n * 3),
	filter((n) => n % 2 === 0)
).subscribe(n => console.log(n));
```

- Chiamata HTTP che ritorna un `Observable<Product[]>` in [src/app/products/services/products.service.ts](src/app/products/services/products.service.ts#L35-L36).

```ts
getProductFromApi(): Observable<Product[]> {
	return this.httpClient.get<Product[]>('http://localhost:7000/products');
}
```

- Sottoscrizione in componente con cleanup in `ngOnDestroy` in [src/app/products/components/product-page/product-page.component.ts](src/app/products/components/product-page/product-page.component.ts#L28-L38).

```ts
this.subscriptionProducts = this.service.getProductFromApi().subscribe(
	x => this.products = x
);
```

### Pipe

Le pipe trasformano i dati nel template senza modificare i dati originali.

```html
{{ prezzo | currency:'EUR' }}
```

## Guard (Route Guard)

Le **Guard** di Angular sono funzioni o servizi che permettono di controllare l’accesso alle route. Sono spesso usate per proteggere pagine riservate, gestire l’autenticazione o bloccare la navigazione in base a condizioni personalizzate.

Nel progetto, le guard vengono implementate come funzioni standalone (Angular 15+) usando l’interfaccia `CanActivateFn`.

### Esempio di guard per autenticazione

File: `src/app/core/guards/first.guard.ts`

```typescript
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const firstGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if(authService.isLogged){
    return true;
  }
  
  return false;

};
```

Questa guard blocca l’accesso alle route protette se l’utente non è autenticato e lo reindirizza alla pagina di login.

### Come si usano le guard nelle route

Nel file delle route (`app.routes.ts`), puoi applicare la guard a qualsiasi route che vuoi proteggere. Esempi pratici dal progetto:

**Protezione della pagina utenti:**

```typescript
{
	path: 'users',
	loadComponent: () => import('./randomUsers/pages/random-users-page/random-users-page.component').then(m => m.RandomUsersPageComponent),
	canActivate: [firstGuard]
}
```

**Protezione della pagina di benvenuto:**

```typescript
{
	path: 'welcome',
	loadComponent: () => import('./shared/welcome/welcome.component').then(m => m.WelcomeComponent),
	canActivate: [firstGuard]
}
```

In questo modo, la navigazione verso `/users` e `/welcome` sarà consentita solo se la guard restituisce `true` (ad esempio, se l’utente è autenticato).

### Esempio di integrazione con AuthService

Nel progetto è presente un servizio di autenticazione (`AuthService`) che gestisce lo stato di login:

```typescript
// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
	isLogged = false;
	logout() {
		this.isLogged = false;
	}
	login(): Observable<boolean> {
		return of(true).pipe(
			delay(1000),
			tap(() => this.isLogged = true)
		);
	}
}
```

La guard può usare questo servizio per controllare l’accesso



## HttpInterceptor

Gli **HttpInterceptor** in Angular sono strumenti che permettono di intercettare e modificare tutte le richieste e risposte HTTP effettuate tramite `HttpClient`. Sono utili per aggiungere header, gestire autenticazione, logging, error handling, ecc.

### Come funzionano

Un interceptor è una funzione o classe che implementa la logica da eseguire prima che una richiesta HTTP venga inviata o una risposta venga ricevuta. Tutte le richieste passano attraverso la catena di interceptor registrati.

### Configurazione nel progetto

In questo progetto, gli interceptor sono configurati in modalità **standalone** tramite il file `src/app/app.config.ts` usando la funzione `withInterceptors` di Angular 16+.

Esempio di configurazione reale:

```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstInterceptorInterceptor } from './core/interceptors/first-interceptor.interceptor';
import { secondInterceptorInterceptor } from './core/interceptors/second-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
	providers: [
		// ...altri provider...
		provideHttpClient(
			withInterceptors([
				firstInterceptorInterceptor,
				secondInterceptorInterceptor
			])
		),
		// ...altri provider...
	]
};
```
Gli interceptor sono definiti come funzioni in `src/app/core/interceptors/`:

```typescript
// Esempio: first-interceptor.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const firstInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
	// Logica custom
	return next(req);
};
```
In questo modo, tutte le richieste HTTP passeranno attraverso gli interceptor definiti, permettendo di centralizzare logiche trasversali come logging, gestione errori, aggiunta di header, ecc.
