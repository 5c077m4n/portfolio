import {
	Component,
	OnInit,
	Input,
	ElementRef,
	ViewChild,
	AfterViewInit,
	OnDestroy,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from '@angular/core';
import Chart from 'chart.js';


@Component({
	selector: 'app-module-item',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './module-item.component.html',
	styleUrls: ['./module-item.component.css']
})
export class ModuleItemComponent implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild('moduleChart') private ctx: ElementRef;
	@Input() public module: any;
	public moduleChart: any;
	constructor(private cdr: ChangeDetectorRef) {}
	ngOnInit() {}
	ngAfterViewInit(): void {
		Chart.defaults.global.defaultFontColor = 'black';
		this.moduleChart = new Chart(this.ctx.nativeElement, {
			type: 'line',
			data: {
				labels: this.module.packageDetails.collected.npm.downloads.map(data => data.midDate.toLocaleDateString('en-GB')),
				datasets: [{
					label: '# of Downloads',
					data: this.module.packageDetails.collected.npm.downloads.map(data => data.count),
					backgroundColor: [],
					borderColor: [],
					borderWidth: 1
				}]
			},
			options: {
				elements: { line: { tension: 0 } },
				scales: {
					yAxes: [{ ticks: { beginAtZero: true } }]
				},
				showLines: false,
			}
		});
	}

	ngOnDestroy(): void {
		this.moduleChart.destroy();
	}
}
