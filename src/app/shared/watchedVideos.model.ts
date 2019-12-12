export class watchedVideos {

    public idvideoFK: string;
    public idplayerFK: string;

    constructor(idvideoFK: string, idplayerFK: string) {
        this.idvideoFK = idvideoFK;
        this.idplayerFK = idplayerFK;
    }
}