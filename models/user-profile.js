class UserProfile {
    constructor(userProfileId, profileName, email, department, title) {
        [this.userProfileId,
        this.profileName,
        this.email,
        this.department,
        this.title] = arguments;
    }
}

export default UserProfile;