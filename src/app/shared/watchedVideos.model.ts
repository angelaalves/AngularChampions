

export class watchedVideos{

    public idVideoFK: string;
    public idPlayerFK: string;

    constructor(idVideoFK: string, idPlayerFK: string){
        this.idVideoFK=idVideoFK;
        this.idPlayerFK=idPlayerFK;
    }
}