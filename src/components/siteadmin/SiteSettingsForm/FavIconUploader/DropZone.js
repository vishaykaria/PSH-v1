import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import DropzoneComponent from 'react-dropzone-component';
import { toastr } from 'react-redux-toastr';

// React redux
import { connect } from 'react-redux';

// Redux form
import { change } from 'redux-form';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';

// Redux actions
import { setLoaderStart, setLoaderComplete } from '../../../../actions/loader/loader';
import { updateFaviconLogo } from '../../../../actions/siteadmin/manageLogo';

import messages from '../../../../locale/messages';

import { maxUploadSize } from '../../../../config';

class Dropzone extends React.Component {

    static propTypes = {
        startLogoUploaderLoader: PropTypes.any.isRequired,
    };

    static defaultProps = {
        data: null
    };

    constructor(props) {
        super(props);
        this.error = this.error.bind(this);
        this.success = this.success.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.dropzone = null;
    }

    async success(file, fromServer) {
        const { setLoaderComplete, updateFaviconLogo, oldFaviconLogo } = this.props;
        await updateFaviconLogo('Favicon Logo', 'faviconLogo', fromServer.file.filename, oldFaviconLogo);
        await setLoaderComplete('favIconLoader');
    }

    async error(file, message) {
        const { setLoaderComplete } = this.props;
        toastr.error('Error!', message);
        await setLoaderComplete('favIconLoader');
    }

    addedfile(file, fromServer) {
        const { setLoaderStart } = this.props;
        if (file && file.size > (1024 * 1024 * maxUploadSize)) {
            this.dropzone.removeFile(file);
        } else {
            setLoaderStart('favIconLoader');
        }
    }

    render() {
        const { formatMessage } = this.props.intl;
        const djsConfig = {
            dictDefaultMessage: formatMessage(messages.clickHeretoUploadFavIcon),
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: 10,
            acceptedFiles: 'image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false,
        };
        const componentConfig = {
            iconFiletypes: ['.png'],
            postUrl: '/uploadFavIcon'
        };
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile,
            error: this.error,
        };

        return (
            <div>
                <DropzoneComponent
                    config={componentConfig}
                    eventHandlers={eventHandlers}
                    djsConfig={djsConfig}
                    clickable={false}
                />
            </div>
        );
    }
}

const mapState = (state) => ({
    change
});

const mapDispatch = {
    setLoaderStart,
    setLoaderComplete,
    updateFaviconLogo
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Dropzone)));