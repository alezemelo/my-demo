# MyDemo

Questo è un progetto in Angular CLI version 19.2.22.


## Struttura del progetto

Questa versione dell'applicazione è organizzata in questo modo:

- `src/` contiene tutto il codice dell'app.
- `src/app/` è la radice dell'applicazione Angular.
- `src/app/app.component.*` contiene il componente principale.
- `src/app/app.routes.ts` e `src/app/app.config.ts` gestiscono routing e configurazione.
- `src/app/core/components/menu/` contiene il componente di navigazione principale (menu).
- `src/app/products/` raccoglie la feature Products con:
  - `components/` per i componenti UI (table, page, details, ecc.).
  - `models/` per i modelli TypeScript (es. `product.ts`).
  - `pipes/` per le pipe personalizzate.
  - `services/` per i servizi Angular (es. accesso ai dati).
- `src/styles.css` contiene gli stili globali.
- `public/` ospita asset statici.

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
json-server db.json -p 7000 -d 1000
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

Per abilitare `HttpClient` si usa direttamente `app.config.ts`.

Esempio:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
	providers: [provideHttpClient()]
};
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

Le pipe personalizzate si trovano in `src/app/products/pipes/` e si dichiarano in un modulo o in `standalone` component.
