import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { PortfolioService } from '../../services/portfolio.service';


@Component({
	selector: 'app-module-list',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './module-list.component.html',
	styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {
	public modules: any[];
	public loadingErrorMessage: string;
	public readonly MOBILE_SCREEN_SIZE = 959;
	constructor(
		private portfolio: PortfolioService,
		private cdr: ChangeDetectorRef,
	) {}
	ngOnInit() {
		this.module$.subscribe();
		window.setTimeout(
			() => {
				if(this.modules && this.modules.length) return;
				this.loadingErrorMessage =
					' (if this is taking too long there might be an error with the npms.io API)';
				this.cdr.detectChanges();
			}, 5000
		);
	}

	public get module$(): Observable<any> {
		return this.portfolio.getNpmPackages()
			.pipe(
				map(res => (res)? res.results : []),
				tap(resArr => this.modules = resArr),
				switchMap(resArr => {
					const obsArr = resArr.map((res, index) =>
						this.portfolio.getNpmPackage(res.package.name)
							.pipe(tap(pkgDtls => {
								pkgDtls.totalDownloads = this.countDownloads(pkgDtls)
								this.modules[index].packageDetails = pkgDtls;
							}))
					);
					return forkJoin(obsArr);
				}),
				tap(_ => this.cdr.detectChanges()),
			);
	}

	private countDownloads(pkg: any): number {
		return pkg
			.collected
			.npm
			.downloads
			.reduce((accu, curr) => accu += curr.count, 0);
	}
}
