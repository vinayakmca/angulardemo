import {Experiance} from '../model/experiance';
import {Education} from '../model/education';
export class Profile {
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    mobile:string;
    profilePicture:string;
    education:Education[]=[];
    experiance:Experiance[]=[];
}
