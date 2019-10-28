import { playerType } from './playerType.enum';
import { gender } from './playerGender.enum';

export class Player{
    public name: string;
    public email: string;
    public password: string;
    public imagePath: string[];
    public xp: number;
    public playerType: playerType;
    public gender: gender;
    public coinsGive: number;
    public coinsReceived: number;

    constructor(name:string, email:string, password:string, imagePath: string[], playerType: playerType, gender: gender){
        this.name=name;
        this.email=email;
        this.password=password
        this.imagePath=imagePath;
        this.playerType=playerType;
        this.gender=gender;
        this.xp=80;
        this.coinsGive=20;
        this.coinsReceived=20;
    }

    getImagePath(index:number){
        return this.imagePath[index]
    }
}