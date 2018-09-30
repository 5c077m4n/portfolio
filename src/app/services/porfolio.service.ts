import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' }) export class PorfolioService {
	private readonly URL = 'https://api.bitbucket.org/2.0/repositories/5c077m4n?sort=-updated_on';
	constructor(private http: HttpClient) {}

	public getProjects(): Observable<any> {
		return this.http.get(this.URL)
			.pipe(
				tap(res => {
					if(!res) console.error('There was an error in getting the portfolio.');
				}),
				map((res: any) => (res)? res.values : []),
				catchError(this.handleError('getProjects', []))
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
