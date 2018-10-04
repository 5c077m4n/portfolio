import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
	selector: 'app-project-item',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './project-item.component.html',
	styleUrls: ['./project-item.component.css'],
	animations: [
		trigger('sidePanelAnimation', [
			transition(':enter', [
				style({ opacity: 0 }),
				animate(300, style({ opacity: 1 })),
			]),
			transition(':leave', [
				animate(300, style({ opacity: 0 }))
			]),
		]),
	]
})
export class ProjectItemComponent implements OnInit {
	@Input() public project;
	public showSidePanel = false;
	constructor() {}
	ngOnInit() {}
}
