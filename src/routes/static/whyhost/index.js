import React from 'react';
import Layout from '../../../components/Layout';
import WhyHost from './WhyHost';

const title = 'whyhost';

export default function action() {
  return {
    title,
    component: <Layout><WhyHost title={title} /></Layout>,
  };
}
