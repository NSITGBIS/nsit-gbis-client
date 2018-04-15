/** landing page js */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Store from '../../utils/storage';
import APIManager from '../../utils/APIManager';
import { API } from '../../configs/app_config';

import { Line, Circle } from 'rc-progress';
import { ProgressBar } from 'react-bootstrap';

// import SignUp from '../components/landing/signup';

class LandingPage extends Component {
	static propTypes = {
		store: PropTypes.object.isRequired
	};
	state = {
		open: false,
		progress: 0,
		uploaded: 0,
		filename: '',
		preuploadname: ''
	};
	setprogress = p => {
		this.setState({
			progress: p
		});
	};
	resetState = () => {
		this.setState({
			progress: 0,
			uploaded: 0,
			preuploadname: ''
		});
	};
	uploadDocumentRequest = event => {
		const file = event.target.files[0];
		const fileName = event.target.files[0].name.replace(/\s/g, '');
		const formData = new FormData();
		formData.append('file', file);
		formData.append('filename', fileName);
		// console.log(file);
		// console.log(formData);
		this.setState({ preuploadname: fileName });
		APIManager.postData('/upload', formData, null, this.setprogress).then(
			res => {
				if (res.status === 200) {
					this.setState({ uploaded: 1, filename: res.body.fileName });
				}
			}
		);

		// let data = new FormData();
		// data.append('file', document);
		// data.append('name', name);

		// const file = event.target.files[0];
		// let formData = new FormData();
		// formData.append('file', file);

		// return (dispatch) => {
		//   axios.post('/files', data)
		//     .then(response => dispatch(uploadSuccess(response))
		//     .catch(error => dispatch(uploadFail(error));
		// };
	};

	handleRequestClose = () => {
		this.setState({ open: !this.state.open });
	};
	render() {
		const { open, progress, uploaded, filename, preuploadname } = this.state;
		const { store } = this.props;
		return (
			<Provider store={store}>
				<div>
					<header id="header" className="sections">
						<div id="part" />
						<nav className="navbar navbar-inverse navbar-findcond">
							<div className="container">
								<div className="navbar-header">
									<button
										type="button"
										className="navbar-toggle collapsed"
										data-toggle="collapse"
										data-target="#navbar"
									>
										<span className="sr-only">Toggle navigation</span>
										<span className="icon-bar" />
										<span className="icon-bar" />
										<span className="icon-bar" />
									</button>
									<a
										className="navbar-brand"
										href="/"
										title="Activate Lazy Scrolling "
									>
										<h4>NSIT-GBIS</h4>
									</a>
								</div>
								<div className="collapse navbar-collapse" id="navbar">
									<ul className="nav navbar-nav navbar-right">
										<li className="hvr-underline-from-center">
											<a href="#getStarted">Get Started</a>
										</li>

										<li className="hvr-underline-from-center">
											<a title="+91 98999 13649"> +91 98999 xxxxx</a>
										</li>

										<li className="hvr-underline-from-center">
											<a href="mailto:care@nsitgbis.com">care@nsitgbis.com</a>
										</li>

										<li
											className="hvr-float-shadow active"
											style={{ cursor: 'pointer' }}
										>
											<a>Sign In/Sign Up</a>
										</li>
									</ul>
								</div>
							</div>
						</nav>

						<div
							id="top-content"
							className="wow bounceInUp"
							data-wow-delay="0.2s"
							data-wow-duration="1.5s"
						>
							<h2 className="text-bold">Storing Digital Data into DNA</h2>
							<br />
							{/* <h4 id="texterX">
								This tool allows you to convert <br /> digital data into DNA
							</h4> */}
							<br />
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-3 col-xs-2" />
									<div className="col-md-6 col-xs-8">
										<a
											className="btn-block btn btn-lg btn-default btn-cta"
											href="#getStarted"
										>
											Get Started
										</a>
										<br />
									</div>
								</div>
								<div className="row">
									<div className="col-xs-1 col-md-3" />
									<div className="col-md-6 col-xs-10">
										<div className="embed-responsive embed-responsive-16by9">
											<iframe
												frameBorder="0"
												allowFullScreen=""
												className="embed-responsive-item"
												src="https://www.youtube.com/embed/tBvd7OSDGgQ?modestbranding=1"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</header>

					<section className="sectionsFull" id="getStarted">
						<div className="container-fluid">
							<div className="row">
								<h3 className="section-heading text-center">
									Upload a file to encode or decode
								</h3>
								<hr className="primary" />
							</div>
							<div
								className="row wow fadeInUp text-center"
								data-wow-delay="0.2s"
								data-wow-duration="1s"
							>
								<div className="col-md-4 col-md-offset-4">
									<div className="upload-btn-wrapper">
										<button className="btn-block btn btn-lg btn-default btn-cta">
											<i className="fa fa-upload" /> Upload File
										</button>
										<input
											type="file"
											name="myfile"
											onClick={this.resetState}
											onChange={this.uploadDocumentRequest}
										/>
									</div>
									{progress !== 0 && (
										<div className="progressbar-wrapper">
											{/* <Line percent={progress} strokeWidth="2" /> */}
											<ProgressBar
												active
												now={progress}
												style={{ marginBottom: '0px' }}
											/>
											{progress != 100 ? (
												<p>{progress} %</p>
											) : !uploaded ? (
												preuploadname.endsWith('.dna') ? (
													<p>Decoding DNA file</p>
												) : (
													<p>Converting file into DNA</p>
												)
											) : (
												<p>Download the file</p>
											)}
										</div>
									)}
									{uploaded === 1 && (
										<div className="upload-btn-wrapper">
											<a
												href={`/uploads/${filename}`}
												className="btn-block btn btn-lg btn-default btn-cta"
												download
											>
												<i className="fa fa-download" /> Download File
											</a>
										</div>
									)}
								</div>
							</div>
						</div>
					</section>

					<section className="sections" id="work">
						<div className="container-fluid">
							<div className="row">
								<h3 className="section-heading text-center">About Us</h3>
								<hr className="primary" />
							</div>
							<div
								className="row wow fadeInUp"
								data-wow-delay="0.2s"
								data-wow-duration="1s"
							>
								<div className="col-md-12">
									<h4>
										The Genomics and biological information Systems group(GBIS)
										at Netaji Subhas Institute of Technology is a attempt to
										create a research group in NSIT which aims to contribute to
										a very recent scientific development taking place in world.
										Thus we aim to bring out better culture for research at NSIT
										by exploring the intersection of information technology and
										molecular-level manipulation using in-silico and wet lab
										experiments.
									</h4>
								</div>
							</div>
						</div>
					</section>

					<footer className="sections">
						<div
							className="container-fluid wow fadeInUp"
							data-wow-delay="0.2s"
							data-wow-duration="1s"
						>
							<div className="row" id="alc-footer">
								<div className="col-md-12 text-center">
									<h5 className="color-white">
										<i className="fa fa-copyright" /> NSIT GBIS 2018
									</h5>
								</div>
							</div>
						</div>
					</footer>
				</div>
			</Provider>
		);
	}
}

export default LandingPage;
