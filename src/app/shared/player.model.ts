import { userType } from './userType.enum';
import { gender } from './playerGender.enum';
import { status } from './status.enum';
import { Skin } from './skin.model';
import { skinType } from './skinType.enum';

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

    changeImage(imgPath: string, type: skinType ){
        let index;
        if(skinType.Hair==type){
            index = 0;
        }else if(skinType.SkinColor==type){
            index = 1;
        }else if (skinType.Top==type){
            index = 2;
        }else if(skinType.Bottom==type){
            index = 3;
        }else if(skinType.Shoes==type){
            index = 4;
        }else if(skinType.Others==type){
            index = 5;
        }
        this.imagePath.splice(Number(index), 1, imgPath);
    }
}