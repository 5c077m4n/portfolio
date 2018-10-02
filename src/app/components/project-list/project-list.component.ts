import {
	Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy
} from '@angular/core';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { PorfolioService } from '../../services/porfolio.service';


@Component({
	selector: 'app-project-list',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {
	private listener: Subscription;
	public projects: any[];
	public projectIndex = 1;
	public loadingErrorMessage = '';
	public screenSize: number = window.innerWidth;
	constructor(
		private portfolio: PorfolioService,
		private cdr: ChangeDetectorRef
	) {
		this.listener = new Subscription();
	}
	ngOnInit() {
		this.listener.add(this.project$.subscribe());
		this.listener.add(this.onScreenResize$.subscribe());
		this.listener.add(this.onMouseWheel$.subscribe());
		window.setTimeout(
			() => {
				this.loadingErrorMessage = ' (if this is taking too long there might be an error with the Bitbucket API)';
				this.cdr.detectChanges();
			},
			5000
		);
	}

	public get project$(): Observable<any> {
		return this.portfolio.get10NewestProjects()
			.pipe(
				map((res: any) => (res)? res.values : undefined),
				tap(projects => this.projects = projects),
				tap(_ => this.cdr.detectChanges())
			);
	}
	public get onMouseWheel$(): Observable<any> {
		return fromEvent(document, 'mousewheel')
			.pipe(
				tap((event: MouseWheelEvent) => {
					if(event.isTrusted && (this.screenSize > 960)) {
						if((event.deltaY > 0) && (this.projectIndex < this.projects.length))
							this.projectIndex++;
						if((event.deltaY < 0) && (this.projectIndex > 1))
							this.projectIndex--;
					}
				}),
				tap(_ => this.cdr.detectChanges()),
			);
	}
	public get onScreenResize$(): Observable<any> {
		return fromEvent(window, 'resize')
			.pipe(
				tap((event: any) => this.screenSize = event.target.innerWidth),
				tap(_ => this.cdr.detectChanges()),
			);
	}

	ngOnDestroy(): void {
		this.listener.unsubscribe();
	}
}
