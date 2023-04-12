
export interface IUser {
    username: string,
    password: string
}

export interface IUserPass {
    username: string,
    password: string
}

export interface IUserObject extends IUser {
    createdAt: Date;
    updatedAt: Date;
}