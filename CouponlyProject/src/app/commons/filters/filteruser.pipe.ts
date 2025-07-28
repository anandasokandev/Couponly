import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteruser'
})
export class FilteruserPipe implements PipeTransform {

  transform(list: any[], search: string): any[] {
    if(search) {
            return list.filter(list => list.userName.toLowerCase().includes(search.toLowerCase()))
        }
        else
            return list
  }

}
