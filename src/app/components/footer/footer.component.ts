import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';


@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
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
	}
	ngOnInit() {}
}
