import { Player } from 'src/app/shared/player.model';

export class Guild {
    public idguild: string;
    public guildName: string;
    public guildFlag: string;
    public startDate: string;
    public endDate: string;
    public status: string;
    public guildmaster: Player;
    public members: Player[];

    constructor(idguild: string, guildName: string, guildFlag: string, startDate: string, endDate: string, status: string) {
        this.idguild = idguild;
        this.guildName = guildName;
        this.guildFlag = guildFlag;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }

    getPlayers() {
        return this.members;
    }

    getGuildMaster() {
        return this.guildmaster;
    }

    setGuildMaster(guildmaster: Player) {
        this.guildmaster = guildmaster;
    }
    setMembers(members: Player[]) {
        this.members = members;
    }
}