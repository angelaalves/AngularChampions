import { userType } from './userType.enum';
import { gender } from './playerGender.enum';
import { status } from './status.enum';

export class Player {
    public idplayer: string;
    public idguildFK: string;
    public userName: string;
    public gender: gender;
    public userType: userType;
    public email: string;
    public password: string;
    public imagePath: string[];
    public xp: string;
    public champiesToGive: string;
    public myChampies: string;
    public status: status;

    constructor(idPlayer: string, idGuild: string, UserName: string, email: string, password: string, imagePath: string[], xp: string, ChampiesToGive: string, MyChampies: string, userType: userType, gender: gender, status: status) {
        this.idplayer = idPlayer;
        this.idguildFK = idGuild;
        this.userName = UserName;
        this.email = email;
        this.password = password;
        this.imagePath = imagePath;
        this.xp = xp;
        this.champiesToGive = ChampiesToGive;
        this.myChampies = MyChampies;
        this.userType = userType;
        this.gender = gender;
        this.status = status;
    }
    getImagePath(index: number) {
        return this.imagePath[index];
    }
}