import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../core/services/position.service';
import { PositionDataResponse } from '../../shared/models/IPosition';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-position',
  imports: [FormsModule, FormsModule],
  templateUrl: './position.html',
  styleUrl: './position.css',
})
export class Position implements OnInit{

  // List Holder
  PositionData : PositionDataResponse[] = [];

  // Params
  ElectionNameParams ? : string;
  PositionNameParams ? : string;

  constructor(private positionService : PositionService) 
  {

  }

  ngOnInit(): void 
  {
    this.onLoadPositionData();
  }

  onClickFilterPosition()
  {
    this.ElectionNameParams;
    this.PositionNameParams;

    this.onLoadPositionData(this.ElectionNameParams, this.PositionNameParams);
  }
  onLoadPositionData(electionName ? : string, positionName ? : string)
  {
    this.positionService.GetPositionDataService(electionName, positionName).subscribe({
      next : (res) =>{
        if(res !== null){
          this.PositionData = res;
          console.log('Election Name ',electionName);
          console.log('Position Name ',positionName);
          
          console.log('Response ',res);
        }
          
      },
      error : (err) =>{
        console.log('Error : ',err);
      }
    });
  }


}
