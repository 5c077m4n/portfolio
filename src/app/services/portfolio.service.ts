import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, map, retry, delay, retryWhen, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' }) export class PortfolioService {
	private readonly bitbucketUrl = 'https://api.bitbucket.org/2.0/repositories/5c077m4n';
	private readonly npmsIoUrl = 'https://api.npms.io/v2';
	constructor(private http: HttpClient) {}

	public get10NewestProjects(): Observable<any> {
		return this.http.get(`${this.bitbucketUrl}?sort=-updated_on`)
			.pipe(
				tap(res => {
					if(!res) console.error('There was an error in getting the portfolio.');
				}),
				retryWhen(error => error.pipe(delay(3000), take(5))),
				catchError(this.handleError('getProjects', [])),
			);
	}
	public getNpmPackages(): Observable<any> {
		return this.http.get(`${this.npmsIoUrl}/search?q=maintainer:5c077m4n`)
			.pipe(
				tap(res => {
					if(!res) console.error('There was an error in getting the packages.');
				}),
				retryWhen(error => error.pipe(delay(3000), take(5))),
				catchError(this.handleError('getNpmPackages', [])),
			);
	}
	public getNpmPackage(name: string): Observable<any> {
		return this.http.get(`${this.npmsIoUrl}/package/${name}`)
			.pipe(
				tap(res => {
					if(!res) console.error('There was an error in getting the package.');
				}),
				retryWhen(error => error.pipe(delay(3000), take(5))),
				catchError(this.handleError('getNpmPackage', [])),
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
