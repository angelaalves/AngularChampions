import { skinType } from './skinType.enum';

export class Skin {
    public idSkin: string;
    public skinName: string;
    public imagePath: string;
    public minXP: string;
    public champiesCost: string;
    public skinType: skinType;

    constructor(idSkin: string, skinName: string, imagePath: string, minXP: string, champiesCost: string, skinType: skinType) {
        this.idSkin = idSkin;
        this.skinName = skinName;
        this.imagePath = imagePath;
        this.minXP = minXP;
        this.champiesCost = champiesCost;
        this.skinType = skinType;
    }
}