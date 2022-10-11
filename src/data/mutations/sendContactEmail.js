// GrpahQL
import {
  GraphQLString as StringType
} from 'graphql';

import CountryType from '../types/CountryType';

import { sendServerEmail } from '../../core/email/sendServerEmail';
import { getSpecificConfig } from '../../helpers/getConfigValue';

const sendContactEmail = {

  type: CountryType,

  args: {
    phoneNumber: { type: StringType },
    name: { type: StringType },
    email: { type: StringType },
    ContactMessage: { type: StringType }
  },
  async resolve({ request }, {
    phoneNumber,
    name,
    email,
    ContactMessage
  }) {
    let content = {
      phoneNumber,
      name,
      email,
      ContactMessage
    };

    const configData = await getSpecificConfig({ name: ['email'] });

    await sendServerEmail(configData.email, 'contact', content);

    return {
      status: '200'
    };
  },
};
export default sendContactEmail;

/*

mutation sendContactEmail(
  $phoneNumber: String,
  $name: String,
  $email: String,
  $ContactMessage: String
){
    sendContactEmail(
      phoneNumber: $phoneNumber,
      name: $name,
      email: $email,
      ContactMessage: $ContactMessage
    ) {
        status
    }
}

*/
