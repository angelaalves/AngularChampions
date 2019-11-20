export class Reward{
    public idReward: string;
    public idPlayerGiverFK: string;
    public idPlayerReceiverFK: string;
    public champiesGiven: string; 
    public dateOfReward: string; 
    public approved: string; 
    public timeSpent: string; 

    constructor(idReward: string, idPlayerGiverFK: string, idPlayerReceiverFK: string,champiesGiven: string, dateOfReward: string, approved: string, timeSpent: string){
        this.idReward=idReward;
        this.idPlayerGiverFK=idPlayerGiverFK;
        this.idPlayerReceiverFK=idPlayerReceiverFK;
        this.champiesGiven=champiesGiven;
        this.dateOfReward=dateOfReward;
        this.approved=approved;
        this.timeSpent=timeSpent;
    }
}