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
		return this.portfolio.getNpmioPackages()
			.pipe(
				map(res => (res)? res.results : []),
				tap(resArr => this.modules = resArr),
				switchMap(resArr => {
					const obsArr = resArr.map((res, index) =>
						this.moduleDetials(res.package.name)
							.pipe(tap(pkgDtls =>
								this.modules[index].packageDetails = pkgDtls
							))
					);
					return forkJoin(obsArr);
				}),
				tap(_ => this.cdr.detectChanges()),
			);
	}
	public moduleDetials(pkgName: string): Observable<any> {
		return this.portfolio.getNpmioPackage(pkgName)
			.pipe(
				map(pkgDtls => {
					pkgDtls.totalDownloads = this.countDownloads(pkgDtls);
					return pkgDtls;
				}),
				map(pkgDtls => {
					pkgDtls.collected.npm.downloads = this.createMidDate(pkgDtls);
					return pkgDtls;
				}),
			);
	}
	public moduleDownloadCount(pkgName: string): Observable<any> {
		return this.portfolio.getNpmjsDownloadCount(pkgName)
			.pipe(
				map(res => res.downloads || []),
			);
	}

	private countDownloads(pkg: any): number {
		const dls = pkg.collected.npm.downloads;
		let i = dls.length, counter = 0;
		while(i--) counter += dls[i].count;
		return counter;
	}
	private createMidDate(pkg: any): Object[] {
		const dls = pkg.collected.npm.downloads;
		let i = dls.length;
		while(i--) {
			dls[i].from = new Date(dls[i].from);
			dls[i].to = new Date(dls[i].to);
			dls[i].midDate = new Date(
				(dls[i].from.getTime() + dls[i].to.getTime()) / 2
			);
		}
		return dls;
	}
}
