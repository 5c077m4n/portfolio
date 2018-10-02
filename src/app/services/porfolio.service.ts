import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, map, retry, delay, retryWhen, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' }) export class PorfolioService {
	private readonly URL = 'https://api.bitbucket.org/2.0/repositories/5c077m4n';
	constructor(private http: HttpClient) {}

	public get10NewestProjects(): Observable<any> {
		return this.http.get(`${this.URL}?sort=-updated_on`)
			.pipe(
				tap(res => {
					if(!res) console.error('There was an error in getting the portfolio.');
				}),
				retryWhen(error => error.pipe(delay(3000), take(5))),
				catchError(this.handleError('getProjects', [])),
			);
	}

	/** @function handleError - Error handler */
	private handleError<T>(operation = 'operation', result?: T): (any) => Observable<T> {
		return (error: any): Observable<T> => {
			console.error(`[PorfolioService.${operation}()] Error: ${error.message}`);
			return of(result as T);
		};
	}
}
