import { Reward } from '../shared/reward.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RewardService {
    rewardsToApprove: Array<Reward> = [];

    addToArray(reward: Reward) {
        this.rewardsToApprove.push(reward);
        console.log("estou no add to array"+this.rewardsToApprove);
    }
}