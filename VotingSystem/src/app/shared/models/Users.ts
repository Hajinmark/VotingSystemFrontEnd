export interface IUsers
{
    username : string,
    passwordHash : string,
    role : string,
    userDetails : IUserDetails
}

export interface IUserDetails
{
    firstName : string,
    lastName : string,
    email : string
}

export interface ILoginRequest
{
    username : string,
    password : string
}

export interface ILoginResponse
{
    token : string,
    username : string,
    message : string,
    success : boolean
}

export interface JwtPayload
{
  sub: string;
  unique_name: string;
  role: string;
  exp: number;
}