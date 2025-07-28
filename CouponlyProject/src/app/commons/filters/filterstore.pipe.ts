import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterstore'
})
export class FilterStorePipe implements PipeTransform {

  transform(list: any[], search: string): any[] {
    if(search) {
            return list.filter(list => list.storeName.toLowerCase().includes(search.toLowerCase()))
        }
        else
            return list
  }

}
