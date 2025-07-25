import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtercouponcode'
})
export class FiltercouponcodePipe implements PipeTransform {

  transform(list: any[], search: string): any[] {
    if(search) {
            return list.filter(list => list.couponCode.toLowerCase().includes(search.toLowerCase()))
        }
        else
            return list
  }

}
