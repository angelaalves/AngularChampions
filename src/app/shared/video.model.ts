import { topic } from './topic.enum';

export class Video{

    public idvideo: string
    public videoName: string;
    public duration: string;
    public topic: topic;

    constructor(idvideo: string, videoName: string, duration:string, topic :topic){
        this.idvideo=idvideo;
        this.videoName=videoName;
        this.duration=duration;
        this.topic=topic;
    }
}