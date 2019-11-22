import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../shared/player.model';
import { userType } from '../shared/userType.enum';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: Player[], value: userType) {
  
    return value ? list.filter(item => item.userType === value) : list;
  }

}