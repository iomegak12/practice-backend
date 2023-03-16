import express from 'express';
import UserProfileService from '../services/userprofile-service.js';
import jwt from 'jsonwebtoken';

class UserProfileRouting {
    constructor() {
        this.router = express.Router();
        this.userProfileService = new UserProfileService();

        this.initializeRouting();
    }

    initializeRouting() {
        this.router.post('/', async (request, response) => {
            try {
                const SECRET_KEY = 'Prestige123$$/?';
                const body = request.body;
                const userProfileId = body.profileId;
                const password = body.password;

                if (password === 'pass@123') {
                    const userProfile = this.userProfileService.getUserProfile(userProfileId);

                    if (!userProfile) {
                        response.status(401).send({
                            message: 'Invalid Profile / Profile Not Found!'
                        });
                    } else {
                        const token = jwt.sign({
                            userProfileId: userProfile.userProfileId,
                            name: userProfile.profileName,
                            email: userProfile.email,
                            department: userProfile.department,
                            title: userProfile.title
                        }, SECRET_KEY, {
                            expiresIn: '2 days'
                        })

                        response.status(200).send({
                            token
                        });
                    }
                } else {
                    response.status(401).send({
                        message: 'Invalid Credentials Specified!'
                    });
                }
            } catch (error) {
                response.status(500).send({
                    message: error.message
                });
            }
        });
    }

    get Router() {
        return this.router;
    }
}

export default UserProfileRouting;