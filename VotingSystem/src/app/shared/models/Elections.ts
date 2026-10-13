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

export interface UpdateElectionRequest
{
  electionID : number | null,
  electionName : string | null,
  description : string | null,
  startDate : string | null,
  endDate : string | null,
  electionStatus : string | null
}

export interface Election
{
  electionID : number,
  electionName : string,
  description : string,
  startDate : string,
  endDate : string,
  electionStatus : number
}

export interface FilterElectionResponse
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