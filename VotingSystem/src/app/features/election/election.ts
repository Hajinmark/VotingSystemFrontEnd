import { Component, inject, Inject, OnInit } from '@angular/core';
import { Modal } from '../../shared/components/modal/modal';
import { ElectionService } from '../../core/services/election.service';
import { ElectionData, IElectionStatus } from '../../shared/models/Elections';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../shared/models/Users';
import { DataTable } from '../../shared/components/data-table/data-table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-election',
  imports: [Modal, ReactiveFormsModule, DataTable] ,
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

  electionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: [0, Validators.required],
      createdBy: [1, Validators.required]
  });

  electionUpdateForm  = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: [0, Validators.required],
      createdBy: [1, Validators.required]
  });
  data: any;

  activeModal ? : string;

  constructor(private electionService: ElectionService) {}

  ngOnInit(): void 
  {
    this.getElectionStatus();
    this.getElectionData();
    
  }

  getActionData(data : string)
  {
    this.activeModal = data;
  }

  getEditData(data : ElectionData)
  {
    //console.log('Date ',data.startDate.toISOString().slice(0, 16));
    this.electionUpdateForm.patchValue({
      title : data.electionName,
      description : data.electionDescription,
      startDate: this.datePipe.transform(data.startDate, 'yyyy-MM-dd') ?? '',
      endDate: this.datePipe.transform(data.endDate, 'yyyy-MM-dd') ?? '',
      status : data.electionStatus
    });

    console.log('Edit Data ',data);

  }

  getElectionData()
  {
    this.electionService.getElectionData().subscribe({
      next : (data) =>{
        this.electionData = data;
        console.log('Get Election Data ',this.electionData);
      },
      error : (err) =>{
        //console.log(err.message);
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
