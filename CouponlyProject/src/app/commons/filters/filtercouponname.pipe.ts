import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtercouponname'
})
export class FiltercouponnamePipe implements PipeTransform {

  transform(list: any[], search: string): any[] {
    if(search) {
            return list.filter(list => list.couponName.toLowerCase().includes(search.toLowerCase()))
        }
        else
            return list
  }

}
