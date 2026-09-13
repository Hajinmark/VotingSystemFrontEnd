export interface IElectionStatus
{
    id : number,
    name : string
}

export interface ICreateElection
{
  title?: string | null;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  status?: number | null;
  createdBy?: number | null;
}

export interface ElectionData
{
  electionId : number,
  electionName : string,
  electionDescription : string,
  startDate : string,
  endDate : string,
  electionStatus : number,
  createdBy : number,
  createdAt : Date,
  updatedAt : Date,
  createdByName : string,
  statusName : string,
  period : string
}
