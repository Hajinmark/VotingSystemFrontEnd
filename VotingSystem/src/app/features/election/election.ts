import { Component, inject, Inject, OnInit } from '@angular/core';
import { Modal } from '../../shared/components/modal/modal';
import { ElectionService } from '../../core/services/election.service';
import { ElectionData, IElectionStatus } from '../../shared/models/Elections';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators, Form, FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../shared/models/Users';
import { DataTable } from '../../shared/components/data-table/data-table';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-election',
  imports: [Modal, ReactiveFormsModule, DataTable, FormsModule, NgxPaginationModule] ,
  templateUrl: './election.html',
  styleUrl: './election.css',
  providers: [DatePipe]
})
export class Election implements OnInit{

  private fb = inject(FormBuilder);
  private datePipe = inject(DatePipe);

  isModalOpen: boolean = false;
  modalTitle?: string;
  modalDescription?: string;

  
  electionName ? : string;

  //pagination
  page = 1;
  itemsPerPage = 10;
  ElectionStatus : IElectionStatus[] = [];

  electionColumns = [
    {key: 'createdAt', label: 'Created At'},
    {key: 'electionName', label: 'Election'},
    {key: 'period', label: 'Period'},
    {key: 'statusName', label: 'Status'},
    {key: 'createdByName', label: 'Performed By'},
    // {key: 'actions', label: 'Actions'}
  ];

  electionData : ElectionData[] = [];
  electionID ! : number;

  electionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: [0, Validators.required],
      createdBy: [1, Validators.required]
  });

  get electionFCtrls() { return this.electionForm.controls};

  electionUpdateForm  = this.fb.group({
      electionID : [ this.electionID, Validators.required],
      electionName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      electionStatus: [0, Validators.required],
  });
  data: any;

  activeModal ? : string;
  searchElectionName: string | null = '';

  constructor(private electionService: ElectionService, private router: Router) {}

  ngOnInit(): void 
  {
    this.getElectionStatus();
    this.getElectionData();
    
  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onRemoveElection()
  {
    this.electionService.deleteElection(this.electionID).subscribe({
      next : (res) =>{
        console.log(res);
        this.isModalOpen = false;
      },
      error : (err) => console.log(err)
    })
  }

  inactiveModal(data : boolean)
  {
    this.isModalOpen = data
  }
  onOpenDeleteElection(data : ElectionData)
  {
    this.isModalOpen = true;
    this.activeModal = 'Delete_Election_Modal';
    this.modalTitle = "Delete Election";
    this.electionName = data.electionName;
    this.electionID = data.electionId;
    console.log('Data ',data);
  }

  onChangeFilterElectionName()
  {
    if(!this.searchElectionName || this.searchElectionName.trim() === '')
    {
      this.getElectionData();
      return;
    }
   
  }

  onFilterElectionName()
  {
    if(this.searchElectionName || this.searchElectionName?.trim() === '')
    {
      this.electionService.filterElectionByName(this.searchElectionName).subscribe({
        next : (res) =>{
          this.electionData = res
        },
        error : (err) =>{
          console.log('Err : ',err);
        }
      });
    }
    else
    {
      this.getElectionData();
      return;
    }
    
  }
  

  onUpdateElecionData()
  {
    const formValue = this.electionUpdateForm.getRawValue();
    const request = {
      ...formValue,
      electionStatus: formValue.electionStatus?.toString() ?? null
    };
    this.electionService.updateElection(request).subscribe({
      next : (res)=>{
        console.log('Update ',res);
        this.reloadComponent();
      },
      error : (err)=>{
        console.log('Update Err ',err);
      }
    });
  }
  getActionData(data : string)
  {
    this.activeModal = data;
  }

  getEditData(data : ElectionData)
  {
    this.electionUpdateForm.patchValue({
      electionID : data.electionId, 
      electionName : data.electionName,
      description : data.electionDescription,
      startDate: this.datePipe.transform(data.startDate, 'yyyy-MM-dd') ?? '',
      endDate: this.datePipe.transform(data.endDate, 'yyyy-MM-dd') ?? '',
      electionStatus : data.electionStatus
    });

    
  }

  getElectionData()
  {
    this.electionService.getElectionData().subscribe({
      next : (data) =>{
        this.electionData = data;
      },
      error : (err) =>{
      }
    });
  }

  getElectionStatus() 
  {
    this.electionService.getElectectionStatus().subscribe({
      next : (data) =>
      {
        this.ElectionStatus = data;
      }, 
      error: (err)=>
      {
        console.log(err.message);
      }
    })
  }

  openUpdateModal(data : ElectionData)
  {
    this.isModalOpen = true;
    this.modalTitle = 'Update Election';
    this.modalDescription = 'Update the details of current election.';
    this.activeModal = 'Update_Election_Modal';

    this.getEditData(data);
    this.electionID = data.electionId;
  }

  openModal() {
    this.isModalOpen = true;
    this.modalTitle = 'Create Election';
    this.modalDescription = 'Fill in the details to create a new election.';
    this.activeModal = 'Insert_Election_Modal';
  }

  closeModal(data: boolean) {
    this.isModalOpen = data;
    this.activeModal = '';
  }

  submitModal() {
  
    if(this.electionForm.valid)
    {
      //console.log(this.electionForm.value);
      this.electionService.createElection(this.electionForm.value).subscribe({
        next : (response) =>{
          this.electionForm.reset();
          this.closeModal(false);
          this.reloadComponent();
        },
        error : (err) =>{
          console.log(err.message);
        }
      });
    }
    else
    {
      this.electionForm.markAllAsTouched();
    }
    
  }
}
