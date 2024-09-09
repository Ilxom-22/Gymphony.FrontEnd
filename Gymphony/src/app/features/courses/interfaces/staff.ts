import { AccountStatus } from "../../../core/enums/accountStatus";
import { Role } from "../../../core/enums/role";
import { UserProfileImage } from "../../../core/interfaces/user-profile-image";

export interface Staff {
    id: string;
    firstName: string;
    lastName: string;
    bio: string;
    role: Role;
    status: AccountStatus;
    emailAddress: string;
    profileImage: UserProfileImage;
}