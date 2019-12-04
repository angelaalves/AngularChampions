export class Reward{
    public idreward: string;
    public idplayerGiverFK: string;
    public idplayerReceiverFK: string;
    public champiesGiven: string; 
    public dateOfReward: string; 
    public approved: string; 
    public timeSpent: string; 
    public justification: string;

    constructor(idreward: string, idplayerGiverFK: string, idplayerReceiverFK: string,champiesGiven: string, dateOfReward: string, approved: string, timeSpent: string, justification: string){
        this.idreward=idreward;
        this.idplayerGiverFK=idplayerGiverFK;
        this.idplayerReceiverFK=idplayerReceiverFK;
        this.champiesGiven=champiesGiven;
        this.dateOfReward=dateOfReward;
        this.approved=approved;
        this.timeSpent=timeSpent;
        this.justification=justification;
    }
}