import { Component, OnInit, Input } from '@angular/core';

import { PortfolioService } from '../../services/portfolio.service';


@Component({
	selector: 'app-module-item',
	templateUrl: './module-item.component.html',
	styleUrls: ['./module-item.component.css']
})
export class ModuleItemComponent implements OnInit {
	@Input() public module: any;
	constructor(private portfolio: PortfolioService) {}
	ngOnInit() {}
}
