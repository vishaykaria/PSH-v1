import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { url, sitename } from '../../../config';

class ListPublishRequest extends React.Component {

	static propTypes = {
		content: PropTypes.shape({
			userMail: PropTypes.string.isRequired,
		}).isRequired
	};

	render() {
		const buttonStyle = {
			margin: 0,
			fontFamily: 'Arial',
			padding: '10px 16px',
			textDecoration: 'none',
			borderRadius: '2px',
			border: '1px solid',
			textAlign: 'center',
			verticalAlign: 'middle',
			fontWeight: 'normal',
			fontSize: '18px',
			whiteSpace: 'nowrap',
			background: '#ffffff',
			borderColor: '#FF0002',
			backgroundColor: '#FF0002',
			color: '#ffffff',
			borderTopWidth: '1px',
		};

		const linkText = {
			color: '#FF0002',
			fontSize: '16px',
			textDecoration: 'none',
			cursor: 'pointer',
		}

		const textStyle = {
			color: '#484848',
			backgroundColor: '#F7F7F7',
			fontFamily: 'Arial',
			fontSize: '16px',
			padding: '35px'
		};
		const { content: { hostName, listId, listTitle, logo } } = this.props;
		let URL = url + `/become-a-host/${listId}/home`;

		return (
			<Layout>
				<Header color="#FF0002" backgroundColor="#F7F7F7" logo={logo} />
				<Body textStyle={textStyle}>
					<div>
						Hi Admin,
                    </div>
					<EmptySpace height={20} />
					<div>
						A new listing {listTitle} has been submitted for your approval by the Host {hostName}
					</div>
					<EmptySpace height={20} />
					<div>
						<a style={buttonStyle} href={URL}>Click Here</a>
					</div>
					<EmptySpace height={20} />
					<div>
						Please review and take necessary action.
					</div>
					<EmptySpace height={40} />
					<div>
						Thanks, <br />
						The {sitename} Team
					</div>
				</Body>
				<Footer />
				<EmptySpace height={20} />
			</Layout>
		);
	}

}

export default ListPublishRequest;