import React from 'react';
import Layout from '../../components/Layout';
import UserBanned from './UserBanned';

const title = 'User Banned';

export default function action() {
  return {
    title,
    component: <Layout><UserBanned title={title} /></Layout>,
    status: 404,
  };
}
