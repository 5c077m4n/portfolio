import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'formatNumberCommas' })
export class FormatNumberCommasPipe implements PipeTransform {
	transform(value: number, args?: any): string {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
}
