import Genders from '~/untils/enums/Genders';

export interface AccountInterface {
  id: number;
  account: string;
  name: string;
  dob: string;
  gender: Genders;
  address: string;
  email: string;
  isDeleted: boolean;
}
