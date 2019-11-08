import { playerType } from './playerType.enum';
import { gender } from './playerGender.enum';

export class Player{
    public idPlayer: string;
    public UserName: string; 
    public gender: gender; 
    public playerType: playerType;
    public email: string;
    public password: string;
    public imagePath: string[];
    public xp: string;
    public ChampiesToGive:string;
    public MyChampies:string;
    public Status: string;




    constructor(idPlayer:string, UserName:string, email:string, password:string, imagePath: string[], xp: string, ChampiesToGive:string, MyChampies: string, playerType: playerType, gender: gender, status: string){
        this.idPlayer=idPlayer;
        this.UserName=UserName;
        this.email=email;
        this.password=password;
        this.imagePath=imagePath;
        this.playerType=playerType;
        this.gender=gender;
        this.xp=xp;
        this.ChampiesToGive=ChampiesToGive;
        this.MyChampies=MyChampies;
        this.Status=status;
    }

    getImagePath(index:number){
        return this.imagePath[index]
    }
}