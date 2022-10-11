import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { url, sitename } from '../../../config';

class ReportUserMail extends React.Component {

    static propTypes = {
        content: PropTypes.shape({
            userName: PropTypes.string.isRequired,
            reporterName: PropTypes.string.isRequired,
            reportType: PropTypes.string.isRequired
        })
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

        const textStyle = {
            color: '#484848',
            backgroundColor: '#F7F7F7',
            fontFamily: 'Arial',
            fontSize: '16px',
            padding: '35px'
        };
        const { content: { userName, reporterName, reportType, logo } } = this.props;

        return (
            <Layout>
                <Header color="#FF0002" backgroundColor="#F7F7F7" logo={logo} />
                <Body textStyle={textStyle}>
                    <div>
                        Hi Admin,
                    </div>
                    <EmptySpace height={20} />
                    <div>
                        You got a notification for the user violation.
                    </div>
                    <EmptySpace height={20} />
                    <div>
                        {userName} is voilating the platform terms and reported by {reporterName} <br /><br />
                        Violation: {reportType}
                    </div>
                    <EmptySpace height={20} />
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

export default ReportUserMail;