import { AccountStatus } from "../enums/accountStatus";
import { Role } from "../enums/role";
import { UserProfileImage } from "./user-profile-image";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: Role;
    status: AccountStatus;
    emailAddress: string;
    temporaryPasswordChanged: boolean;
    profileImage?: UserProfileImage;
}
