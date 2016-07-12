/**
 * Created by GiangDH on 5/8/16.
 */
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  birthday: Date;
  username: string;
  password: string;
  email: string;
  role: string;
  ownKnowledgeId:[string];
  interestedKnowledgeId:[string];
  onlineTime:[string];
  createdAt: string;
  updatedAt: string;
  level:string;
}
