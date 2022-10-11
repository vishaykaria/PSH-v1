import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';

import {
    SET_PAYMENT_GATEWAY_STATUS_START,
    SET_PAYMENT_GATEWAY_STATUS_SUCCESS,
    SET_PAYMENT_GATEWAY_STATUS_ERROR
} from '../../constants';

export function updatePaymentGatewayStatus(id, isEnable) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: SET_PAYMENT_GATEWAY_STATUS_START
        });
        try {

            let query = gql`
                query getAllPaymentMethods {
                    getAllPaymentMethods {
                        results{
                            id
                            name
                            paymentName
                            processedIn
                            fees
                            currency
                            details
                            isEnable
                            paymentType
                            createdAt
                            updatedAt
                        }
                        errorMessage
                        status
                    }
                }
            `;

            let mutation = gql`
                mutation updatePaymentGateWayStatus ($id: Int!, $isEnable: Boolean!) {
                    updatePaymentGatewayStatus(id: $id, isEnable: $isEnable) {
                        status
                        errorMessage
                    }
                }
            `;

            const { data } = await client.mutate({
                mutation,
                variables: {
                    id,
                    isEnable
                },
                refetchQueries: [{ query }]
            });

            if (data && data.updatePaymentGatewayStatus && data.updatePaymentGatewayStatus.status == 200) {
                dispatch({
                    type: SET_PAYMENT_GATEWAY_STATUS_SUCCESS
                });
                toastr.success("Success!", "Status has been Updated Successfully!");
                return true;
            } else {
                dispatch({
                    type: SET_PAYMENT_GATEWAY_STATUS_ERROR
                });
                toastr.error("Failed!", data && data.updatePaymentGatewayStatus && data.updatePaymentGatewayStatus.errorMessage);
            }

        } catch (error) {
            dispatch({
                type: SET_PAYMENT_GATEWAY_STATUS_ERROR
            });
            toastr.error("Failed!", "Failed to Update status");
        }
    }
}