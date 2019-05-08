import { User } from "../shared/user.model"
export class Video {
    Name: string;
    Description: string; 
    user:Array<string>;
    creater:string;
    like: Number;
    likedBy:Array<string>;
    comments:Array<string>;
    createdate:Date;
    url:string;
    coverurl:string;
}

