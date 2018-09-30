import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PorfolioService } from '../../services/porfolio.service';


@Component({
	selector: 'app-project-list',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
	public projects: any[];
	public value = 1;
	constructor(
		private portfolio: PorfolioService,
		private cdr: ChangeDetectorRef
	) {}
	ngOnInit() {
		this.project$.subscribe();
	}

	public get project$(): Observable<any> {
		return this.portfolio.getProjects()
			.pipe(
				tap(arr => this.projects = arr),
				tap(() => this.cdr.detectChanges())
			);
	}
}
