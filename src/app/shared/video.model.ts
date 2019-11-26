import { topic } from './topic.enum';

export class Video{

    public idVideo: string
    public videoName: string;
    public duration: string;
    public topic: topic;

    constructor(idVideo: string, videoName: string, duration:string, topic :topic){
        this.idVideo=idVideo;
        this.videoName=videoName;
        this.duration=duration;
        this.topic=topic;
    }
}