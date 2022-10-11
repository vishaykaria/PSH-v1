import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import PaymentGatway from './PaymentGateway';

const title = 'Payment Gateway Section';

export default async function action({ store }) {
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }


    return {
        title,
        component: <AdminLayout><PaymentGatway title={title} /></AdminLayout>
    }
}