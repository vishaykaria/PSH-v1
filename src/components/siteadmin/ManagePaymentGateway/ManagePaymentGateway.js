import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose } from 'react-apollo';
import { injectIntl } from 'react-intl';

import s from './ManagePaymentGateway.css';
import { updatePaymentGatewayStatus } from '../../../actions/siteadmin/updatePayemntGatewayStatus';

// Translation
import messages from '../../../locale/messages';

class ManagePaymentGateway extends React.Component {
    static propTypes = {
        getAllPayments: PropTypes.shape({
            loading: PropTypes.bool,
            refetch: PropTypes.any.isRequired,
            getAllPaymentMethods: PropTypes.array
        }),
        title: PropTypes.string.isRequired,
    };

    handleUpdate(id, e) {
        const { updatePaymentGatewayStatus, getAllPayments: { refetch } } = this.props;
        let isEnable = e.target.value;
        isEnable = isEnable == 'true' ? true : false;
        updatePaymentGatewayStatus(id, isEnable);
        refetch();
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { getAllPayments: { getAllPaymentMethods }, title } = this.props;
        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <div>
                    <h1 className={s.headerTitle}>{formatMessage(messages.paymentGatewaySection)}</h1>
                    <div className={cx('table-responsive', 'tableOne', 'tableBorderRadiusAdmin', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin')}>
                        <Table
                            className="table"
                            noDataText={formatMessage(messages.noRecordFound)}
                            sortable={true}
                        >
                            <Thead>
                                <Th scope="col">{formatMessage(messages.idLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.paymentGateway)}</Th>
                                <Th scope="col">{formatMessage(messages.status)}</Th>
                            </Thead>
                            {
                                getAllPaymentMethods && getAllPaymentMethods.results && getAllPaymentMethods.results.length > 0 && getAllPaymentMethods.results.map((item, index) => {
                                    return (
                                        <Tr key={index}>
                                            <Td data-label={formatMessage(messages.idLabel)} column={formatMessage(messages.idLabel)}>{item.id}</Td>
                                            <Td data-label={formatMessage(messages.paymentGateway)} column={formatMessage(messages.paymentGateway)}>{item.paymentName}</Td>
                                            <Td data-label={formatMessage(messages.status)} column={formatMessage(messages.status)}>
                                                <select value={item.isEnable} onChange={(e) => this.handleUpdate(item.id, e)}>
                                                    <option value={true}>{formatMessage(messages.activeLabel)}</option>
                                                    <option value={false}>{formatMessage(messages.inActiveLabel)}</option>
                                                </select>
                                            </Td>
                                        </Tr>
                                    )
                                })
                            }
                        </Table>
                    </div>
                </div>
            </div>
        )
    }

}

const mapState = (state) => ({
});

const mapDispatch = {
    updatePaymentGatewayStatus
};

export default compose(injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),

)(ManagePaymentGateway);