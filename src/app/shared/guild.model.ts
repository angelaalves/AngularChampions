import { status } from './status.enum';

export class Guild {
    private idGuild: number;
    private guildName: string;
    private startDate: Date;
    private endDate: Date;
    private guildFlag: string;
    private status: status;

    constructor(idGuild: number, guildName: string, startDate: Date, endDate: Date, guildFlag: string, status: status){
        this.idGuild=idGuild;
        this.guildName=guildName;
        this.startDate=startDate;
        this.endDate=endDate;
        this.guildFlag=guildFlag;
        this.status=status;
    }
}