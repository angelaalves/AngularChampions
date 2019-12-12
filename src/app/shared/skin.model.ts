import { skinType } from './skinType.enum';

export class Skin {
    public idskin: string;
    public skinName: string;
    public imagePath: string;
    public minXP: string;
    public champiesCost: string;
    public skinType: skinType;

    constructor(idskin: string, skinName: string, imagePath: string, minXP: string, champiesCost: string, skinType: skinType) {
        this.idskin = idskin;
        this.skinName = skinName;
        this.imagePath = imagePath;
        this.minXP = minXP;
        this.champiesCost = champiesCost;
        this.skinType = skinType;
    }
}