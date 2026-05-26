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