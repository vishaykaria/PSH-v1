import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Assets
import mediumNoImage from '../../../public/SiteImages/medium_no_image.png';
import largeNoImage from '../../../public/SiteImages/large_no_image.jpeg';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListGridCoverPhoto.css'
import cx from 'classnames';
import {
	Col
} from 'react-bootstrap';
import { openExactImageLightBox } from '../../actions/ImageLightBox';
class ListGridCoverPhoto extends React.Component {
	static propTypes = {
		coverPhoto: PropTypes.number,
		listPhotos: PropTypes.array,
		className: PropTypes.string,
		bgImage: PropTypes.bool
	};

	static defaultProps = {
		bgImage: false
	}

	constructor(props) {
		super(props);
		this.state = {
			photo: null
		};
	}

	componentWillMount() {
		const { coverPhoto, listPhotos } = this.props;
		let activePhoto;
		if (listPhotos != undefined && listPhotos.length > 0) {
			activePhoto = listPhotos[0].name;
			if (coverPhoto != undefined && coverPhoto != null) {
				listPhotos.map((item) => {
					if (item.id === coverPhoto) {
						activePhoto = item.name;
					}
				})
			}
			this.setState({ photo: activePhoto });
		}
	}

	componentWillReceiveProps(nextProps) {
		const { coverPhoto, listPhotos } = nextProps;
		let activePhoto;
		if (listPhotos != undefined && listPhotos.length > 0) {
			activePhoto = listPhotos[0].name;
			if (coverPhoto != undefined && coverPhoto != null) {
				listPhotos.map((item) => {
					if (item.id === coverPhoto) {
						activePhoto = item.name;
					}
				})
			}
			this.setState({ photo: activePhoto });
		}
	}

	render() {
		const { className, photoType, bgImage, listPhotos, openExactImageLightBox } = this.props;
		const { photo } = this.state;


		let img0, img1, img2, img4;
		if (listPhotos != undefined && listPhotos.length > 0) {
			img0 = listPhotos[0].src;
			img1 = listPhotos[1].src;
			img2 = listPhotos[2].src;
			img4 = listPhotos[3].src;
		}

		let path = '', source;
		if (photo != null) {
			source = photo;
			if (photoType != undefined) {
				path = '/images/upload/' + photoType + '_';
			}
		} else {
			if (photoType != undefined) {
				if (photoType === "xx_large") {
					source = largeNoImage;
				} else if (photoType === "x_medium") {
					source = mediumNoImage;
				}
			} else {
				source = mediumNoImage
			}
		}

		if (bgImage) {

			return (
				<div>
					<Col xs={6} md={6} lg={6} className={cx(s.leftBanner, 'rightTopBannerRTL')}>
						<a onClick={void (0)}
							onClick={() => openExactImageLightBox(0)}>
							<div className={cx(className, s.bgbanner)} style={{ backgroundImage: `url(${img0})` }}>
								{this.props.children}
							</div>
						</a>
					</Col>
					<Col xs={6} md={6} lg={6} className={cx(s.pad0, s.hiddenxs)}>
						<Col xs={12} md={12} lg={12} className={cx(s.rightTopBanner, 'rightTopBannerRTL')}>
							<a onClick={void (0)}
								onClick={() => openExactImageLightBox(1)}>
								<div className={cx(className, s.bgbanner)} style={{ backgroundImage: `url(${img1})` }}>
								</div>
							</a>
						</Col>
						<Col xs={6} md={6} lg={6} className={cx(s.rightBottom, 'rightTopBannerRTL')}>
							<a onClick={void (0)}
								onClick={() => openExactImageLightBox(3)}>
								<div className={cx(className, s.bgbanner)} style={{ backgroundImage: `url(${img4})` }}>
								</div>
							</a>

						</Col>
						<Col xs={6} md={6} lg={6} className={cx(s.rightBottom, 'rightTopBannerRTL')}>
							<a onClick={void (0)}
								onClick={() => openExactImageLightBox(2)}>
								<div className={cx(className, s.bgbanner)} style={{ backgroundImage: `url(${img2})` }}>
								</div>
							</a>

						</Col>
					</Col>
				</div>
			);
		} else {
			return (
				<img src={path + source} className={className} alt={'ListingCoverPhoto'} />
			);
		}
	}
}

const mapState = (state) => ({
	imageLightBox: state.viewListing.imageLightBox
});

const mapDispatch = {
	openExactImageLightBox
};

export default withStyles(s)(connect(mapState, mapDispatch)(ListGridCoverPhoto));

