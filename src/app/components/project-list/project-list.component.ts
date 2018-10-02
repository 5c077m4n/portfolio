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
	public projects: any[];
	public projectIndex = 1;
	public screenSize: number = window.innerWidth;
	private listeners: Subscription[] = [];
	constructor(
		private portfolio: PorfolioService,
		private cdr: ChangeDetectorRef
	) {}
	ngOnInit() {
		this.listeners.push(
			this.onScreenResize$.subscribe(),
			this.onMouseWheel$.subscribe(),
			this.project$.subscribe(),
		);
	}

	public get project$(): Observable<any> {
		return this.portfolio.getProjects()
			.pipe(
				map((res: any) => (res)? res.values : []),
				tap(arr => this.projects = arr),
				tap(_ => this.cdr.detectChanges())
			);
	}
	public get onMouseWheel$(): Observable<any> {
		return fromEvent(document, 'mousewheel')
			.pipe(
				tap((event: MouseWheelEvent) => {
					if(event.isTrusted) {
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
				tap((event: any) => {
					if(event.isTrusted) this.screenSize = event.target.innerWidth;
				}),
				tap(_ => this.cdr.detectChanges()),
			);
	}

	ngOnDestroy(): void {
		this.listeners.forEach(listener => listener.unsubscribe());
	}
}
