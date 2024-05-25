import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localStorage'
})
export class LocalStoragePipe implements PipeTransform {

  transform(key: string): any {
    let val: any = localStorage?.getItem(key);
    return val;
  }
}
