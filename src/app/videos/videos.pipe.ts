import { Pipe, PipeTransform } from '@angular/core';
import { Video } from '../shared/video.model';
import { topic } from '../shared/topic.enum';

@Pipe({
  name: 'tableFilter2'
})

export class TableFilterPipe2 implements PipeTransform {

  transform(list: Video[], value: topic) {
 
    return value ? list.filter(item => item.topic === value) : list;
  }

}