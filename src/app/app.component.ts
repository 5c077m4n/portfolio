import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(
		private iconRegistry: MatIconRegistry,
		private sanitizer: DomSanitizer
	) {
		this.iconRegistry.addSvgIcon(
			'linkedIn',
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/linkedIn.svg')
		);
		this.iconRegistry.addSvgIcon(
			'resume',
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/resume.svg')
		);
		this.iconRegistry.addSvgIcon(
			'code',
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/code.svg')
		);
		this.iconRegistry.addSvgIcon(
			'code',
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/code.svg')
		);
		this.iconRegistry.addSvgIcon(
			'new_tab',
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/new_tab.svg')
		);
		this.iconRegistry.addSvgIcon(
			'github',
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/github.svg')
		);
		this.iconRegistry.addSvgIcon(
			'bitbucket',
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/bitbucket.svg')
		);
		this.iconRegistry.addSvgIcon(
			'npm',
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/npm.svg')
		);
		this.iconRegistry.addSvgIcon(
			'stats',
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/stats.svg')
		);
		this.iconRegistry.addSvgIcon(
			'email',
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/email.svg')
		);
	}
}
