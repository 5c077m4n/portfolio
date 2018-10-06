import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
	selector: 'app-footer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	public url: string;
	constructor(
		private cdr: ChangeDetectorRef,
		private router: Router
	) {}
	ngOnInit() {
		this.url$.subscribe();
	}

	public get url$(): Observable<any> {
		return this.router.events
			.pipe(
				tap((e: NavigationStart) => {
					if(e.constructor === NavigationStart) this.url = e.url;
				}),
				tap(_ => this.cdr.detectChanges())
			);
	}
	public get currentUrl(): string {
		return this.router.url;
	}
}
