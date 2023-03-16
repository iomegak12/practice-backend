import { UserProfile } from '../models/index.js';

class UserProfileService {
    constructor() {
        this.userProfiles = [
            new UserProfile('UP1011', 'User 11', 'info-11@email.com', 'IT', 'Manager'),
            new UserProfile('UP1012', 'User 12', 'info-12@email.com', 'IT', 'Manager'),
            new UserProfile('UP1013', 'User 13', 'info-13@email.com', 'IT', 'Manager'),
            new UserProfile('UP1014', 'User 14', 'info-14@email.com', 'IT', 'Manager'),
            new UserProfile('UP1015', 'User 15', 'info-15@email.com', 'IT', 'Manager'),
            new UserProfile('UP1016', 'User 16', 'info-16@email.com', 'IT', 'Manager')
        ];
    }

    getUserProfile(profileId) {
        let userProfile = null;

        for (let profile of this.userProfiles) {
            if (profile.profileId === profileId) {
                userProfile = profile;
                break;
            }
        }

        return userProfile;
    }
}

export default UserProfileService;