import {
	GraphQLObjectType as ObjectType,
	GraphQLString as StringType,
	GraphQLInt as IntType,
	GraphQLBoolean as BooleanType,
	GraphQLList as List
} from 'graphql';

export const PaymentMethods = new ObjectType({
	name: 'PaymentMethods',
	fields: {
		id: {
			type: IntType
		},
		name: {
			type: StringType
		},
		processedIn: {
			type: StringType
		},
		fees: {
			type: StringType
		},
		currency: {
			type: StringType
		},
		details: {
			type: StringType
		},
		isEnable: {
			type: BooleanType
		},
		createdAt: {
			type: StringType
		},
		updatedAt: {
			type: StringType
		},
		paymentType: {
			type: IntType
		},
		paymentName: {
			type: StringType
		},
	}
});


const PaymentMethodsType = new ObjectType({

	name: 'PaymentMethodsType',

	fields: {
		count: {
			type: IntType
		},

		status: {
			type: IntType
		},

		errorMessage: {
			type: StringType
		},

		result: {
			type: PaymentMethods
		},

		results: {
			type: new List(PaymentMethods)
		},
	}

});

export default PaymentMethodsType;