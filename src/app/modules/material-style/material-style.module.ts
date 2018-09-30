import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


const modules = [
	MatCardModule,
	MatDividerModule,
	MatButtonModule,
	MatIconModule,
	MatTooltipModule,
	MatSliderModule,
	MatFormFieldModule,
	MatInputModule,
];

@NgModule({
	imports: [
		CommonModule,
		...modules,
	],
	exports: [
		...modules,
	],
	declarations: []
})
export class MaterialStyleModule {}
