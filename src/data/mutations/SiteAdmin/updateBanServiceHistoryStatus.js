import UserManagementType from '../../types/siteadmin/UserManagementType';
import { User, Listing, UserProfile } from '../../../data/models';
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

import { sendServerEmail } from '../../../core/email/sendServerEmail';
import { getSpecificConfig } from '../../../helpers/getConfigValue';

const updateBanServiceHistoryStatus = {
    type: UserManagementType,
    args: {
        id: { type: StringType },
        banStatus: { type: IntType }
    },
    async resolve({ request }, {
        id,
        banStatus
    }) {
        let emailContent;

        if (request.user && request.user.admin == true) {
            //let isActive =  serviceStatus == 'completed' ? 0 : 1;
            const Update = await User.update({
                userBanStatus: banStatus,
                // isActive
            }, {
                where: {
                    id
                }
            });

            if (banStatus == 1) {
                const UpdateListingStatus = await Listing.update({
                    isPublished: 0,
                    // isActive
                }, {
                    where: {
                        userId: id
                    }
                });
            }

            const userData = await User.findOne({
                attributes: ['email', 'id'],
                where: {
                    id
                },
                include: [{
                    model: UserProfile, as: 'profile', required: true,
                    attributes: ['firstName']
                }],
                raw: true
            });

            const configData = await getSpecificConfig({ name: ['email'] });

            // Email template
            emailContent = {
                userName: userData && (userData['profile.firstName'] || userData['profile']['firstName']),
                userMail: userData && userData.email,
                adminMail: configData.email
            };

            if (banStatus === 1) {
                await sendServerEmail(userData.email, 'banStatusServiceStatusBanned', emailContent);
            } else if (banStatus === 0) {
                await sendServerEmail(userData.email, 'banStatusServiceStatusUnBanned', emailContent);
            }

            return {
                status: 'success'
            }
        } else {
            return {
                status: 'failed'
            }
        }
    },
};
export default updateBanServiceHistoryStatus;
