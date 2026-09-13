import { Component, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Input, Output } from '@angular/core';

@Component({
  selector: 'app-data-table',
  imports: [],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable implements OnChanges{

  @Input() columns : any[] = []; 
  @Input() datas : any[] = [];

  @Output() edit = new EventEmitter<any>();
  @Output() action = new EventEmitter<string>();
  @Output() delete = new EventEmitter<any>(); 
 
  constructor() {
   

  }
  ngOnChanges(changes: SimpleChanges): void {

    if(changes['datas'])
    {
      if(this.datas.length !== 0)
      {
        //console.log('Has Data',this.datas);
      }
      else
      {
        //console.log('no Data',this.datas);
      }
    }
  }

  onUpdateModal(data : any)
  {
    this.edit.emit(data);
    this.action.emit('Update_Election_Modal');
  }

}
