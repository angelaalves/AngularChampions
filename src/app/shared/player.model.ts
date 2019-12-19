import { userType } from './userType.enum';
import { gender } from './playerGender.enum';
import { status } from './status.enum';
import { skinType } from './skinType.enum';
import { SessionService } from '../services/session.service';
import { HttpClient } from '@angular/common/http';

export class Player {
    public idplayer: string;
    public userName: string;
    public gender: gender;
    public userType: userType;
    public email: string;
    public password: string;
    public imagePath: String[];
    public xp: string;
    public champiesToGive: string;
    public myChampies: string;
    public status: status;

    constructor(idPlayer: string, UserName: string, email: string, password: string, imagePath: String[], xp: string, ChampiesToGive: string, MyChampies: string, userType: userType, gender: gender, status: status) {
        this.idplayer = idPlayer;
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

    changeImage(imgPath: string, type: skinType) {
        let index;
        if (skinType.Hair == type) {
            index = 0;
        } else if (skinType.SkinColor == type) {
            index = 1;
        } else if (skinType.Top == type) {
            index = 2;
        } else if (skinType.Bottom == type) {
            index = 3;
        } else if (skinType.Shoes == type) {
            index = 4;
        } else if (skinType.Others == type) {
            index = 5;
        }
        this.imagePath.splice(Number(index), 1, imgPath);
    }

    resetImage() {
        var playerData: Player = JSON.parse(localStorage.getItem('playerlogged'));
        if (!playerData) {
            return;
        } else {
            this.imagePath = playerData.imagePath;
        }
    }
}