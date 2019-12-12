import { status } from './status.enum';

export class Closet {
    public idskinFK: string;
    public idPlayerFk: string;
    public status: status;

    constructor(idskinFK: string, idPlayerFk: string, status: status) {
        this.idskinFK = idskinFK;
        this.idPlayerFk = idPlayerFk;
        this.status = status;
    }
}