import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Loader from '../../../components/Loader/Loader';
import ManagePaymentGateway from '../../../components/siteadmin/ManagePaymentGateway/ManagePaymentGateway';
import s from "./PaymentGateway.css";
import getAllPaymentMethods from './getAllPaymentMethods.graphql';
class PaymentGateway extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getAllPaymentMethods: PropTypes.any
        })
    };
    render () {
        const { data: { loading }} = this.props;
        if(loading) {
            return <Loader type={"text"} />;
        }

        const { data, data: {getAllPaymentMethods, refetch}, title} = this.props;
        return <ManagePaymentGateway 
            getAllPayments={data}
            title={title}
            refetch={refetch}
        />
    }

}

export default compose(
    withStyles(s),
    graphql(getAllPaymentMethods, {
        options: {
            fetchPolicy: 'network-only',
            ssr: true
        }
    })
)(PaymentGateway);