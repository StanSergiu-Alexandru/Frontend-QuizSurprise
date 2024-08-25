export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  userGroup: number;
  userPoints: {
    id: number;
    totalPoints: number;
  };
}
