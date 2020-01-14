export class AttendedEvents {
    public ideventFK: string;
    public idplayerFK: string;

    constructor(ideventFK: string, idplayerFK: string) {
        this.ideventFK = ideventFK;
        this.idplayerFK = idplayerFK;
    }
}