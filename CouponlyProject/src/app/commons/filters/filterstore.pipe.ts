import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterstore'
})
export class FilterStorePipe implements PipeTransform {

  transform(list: any[], search: string): any[] {
    if(search) {
            return list.filter(list => list.store.toLowerCase().includes(search.toLowerCase()))
        }
        else
            return list
  }

}
