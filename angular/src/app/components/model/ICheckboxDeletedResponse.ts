export interface ICheckboxDeletedResponse{
  "id": number;
  "todo": string;
  "completed": boolean,
  "userId": number,
  "isDeleted": boolean,
  "deletedOn": string
}
