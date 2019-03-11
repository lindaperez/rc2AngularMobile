import { Injectable } from '@angular/core';
import { LEADERS }  from '../share/leaders';
import { Leader } from '../share/leader';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }



    getLeaders(): Leader[] {
    return LEADERS;
    }

    getLeader(id:string): Leader {

    return LEADERS.filter((leader)=>(leader.id==id))[0];

    }

    getFeaturedLeader(){
    return LEADERS.filter((leader)=> (leader.featured))[0];
    }
}
