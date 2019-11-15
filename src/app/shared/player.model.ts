import { playerType } from './playerType.enum';
import { gender } from './playerGender.enum';
import { status } from './status.enum';

export class Player{
    public idPlayer: string;
    public idGuild: string;
    public UserName: string; 
    public gender: gender; 
    public playerType: playerType;
    public email: string;
    public password: string;
    public imagePath: string[];
    public xp: string;
    public ChampiesToGive:string;
    public MyChampies:string;
    public Status: status;

    constructor(idPlayer:string, idGuild: string, UserName:string, email:string, password:string,  gender: gender, playerType: playerType, xp: string, ChampiesToGive:string, MyChampies: string, status: status,imagePath: string[]){
        this.idPlayer=idPlayer;
        this.idGuild=idGuild;
        this.UserName=UserName;
        this.email=email;
        this.password=password;
        this.imagePath=imagePath;
        this.xp=xp;
        this.ChampiesToGive=ChampiesToGive;
        this.MyChampies=MyChampies;
        this.playerType=playerType;
        this.gender=gender;
        this.Status=status;
    }

    getImagePath(index:number){
        return this.imagePath[index]
    }
}