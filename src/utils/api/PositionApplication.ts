import { api, preRequestRefreshAuth } from "../API";

export type Position = {
    id: string;
    candidates: Candidate[];
    title: string;
    description: string;
    election: string;
  };

  export type Candidate = {
    id: string;
    created: string;
    position: string;
    platform: string;
  };
  const positionManagementUrl = `/elections/manage/position/`;
  
  export async function getPosition(
      positionId:string
      ): Promise<Position>{
        const token = await preRequestRefreshAuth();
        return api
        .get(positionManagementUrl+positionId,{
            headers: {Authorization: `JWT ${token}`}
        })
        .then((res)=>{
            const p: Position = res.data;
            return p;
        })
  }