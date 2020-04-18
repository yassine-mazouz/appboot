import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'EmployerSearchPipe', pure: false })
export class EmployerSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(user => {
        if (user.name) {
          return user.name.search(searchText) !== -1;
        }
        else{
          return user.lastname.search(searchText) !== -1;
        }
      });
    }
  }
}
