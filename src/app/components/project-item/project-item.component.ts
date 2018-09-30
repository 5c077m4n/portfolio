import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';


@Component({
	selector: 'app-project-item',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './project-item.component.html',
	styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
	@Input() public project;
	constructor() {}
	ngOnInit() {}
}
