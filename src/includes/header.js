import React from "react";
import { Row, Col, } from 'react-materialize';
import { Link } from 'react-router-dom'
import cookie from 'react-cookies'

class Nav extends React.Component {
	componentDidMount() {
		$('.collapsible').collapsible({
			accordion: true
		});
	}
	render() {
		let url = this.props.link;
		let name = this.props.name;
		if (this.props.category) {
			return (
				<li>
					<a className="collapsible-header">{name}<i className="fa fa-angle-down right"></i></a>
					<div className="collapsible-body">
						<ul>
							{this.props.category.map(function (nav, index) {
								return <Nav key={index} name={nav.name} link={nav.link} category={nav.category} />
							})
							}
						</ul>
					</div>
				</li>
			)
		}
		else {
			return <li><Link to={url}>{name}</Link></li>
		}
	}
}

export default class Header extends React.Component{
	constructor(props){
		super(props)
		var userInfo = cookie.load("info")
		this.state= {
			Navs: [
				{
					name: "Dashboard",
					link: "/",
					icon: null,
				},
				{
					name: "Personal Loan",
					link: "#",
					icon: null,
					category:
						[
							{name:"SnapShot", link: "/personal-loan"},
							{ name: "Leads", link: "/personal-loan/leads" },
							{ name: "Applications", link: "/personal-loan/applications" },
						]
				},
				{
					name: "Business Loan",
					link: "#",
					icon: null,
					category:
						[
							{name:"SnapShot", link: "/business-loan"},
							{ name: "Leads", link: "/business-loan/leads" },
							{ name: "Applications", link: "/business-loan/applications" },
						]
				},
				{
					name: "Car Loan",
					link: "#",
					icon: null,
					category:
						[
							{name:"SnapShot", link: "/car-loan"},
							{ name: "Leads", link: "/car-loan/leads"},
							{ name: "Applications", link: "/car-loan/applications" },
						]
				},
				{
					name: "Education Loan",
					link: "#",
					icon: null,
					category:
						[
							{name:"SnapShot", link: "/education-loan"},
							{ name: "Leads", link: "/education-loan/leads" },
							{ name: "Applications", link: "/education-loan/applications" },
						]
				},
				{
					name: "Home Loan",
					link: "#",
					icon: null,
					category:
						[
							{name:"SnapShot", link: "/home-loan"},
							{ name: "Leads", link: "/home-loan/leads" },
							{ name: "Applications", link: "/home-loan/applications" },
						]
				},
				{
					name: "About us",
					link: "about-us",
					icon: null
				},
				{
					name: "Contact us",
					link: "contact-us",
					icon: null
				}
			],
			userInfo : userInfo
		}
	}
	componentWillMount(){
		var userInfo = cookie.load("info")
		if (userInfo == undefined) {
			window.location = '/login'
		}
	}
	componentDidMount(){
		$('.dropdown-button').dropdown({
			constrainWidth: true,
			hover: true, // Activate on hover
			belowOrigin: true, // Displays dropdown below the button
		});
		$('.button-collapse').sideNav({
			menuWidth: 300,
			closeOnClick: true,
			draggable: true,
		  }
		);
	}
	render(){
		return(
			<header>
				<ul id="slide-out" className="side-nav">
					<li><div className="user-view">
						<div className="background">
							<img src="../images/office.jpg" />
						</div>
						<Link to="/profile"><img className="circle" src="../images/user.jpg" /></Link>
						<Link to="/profile"><span className="white-text name">Abhinav Rai</span></Link>
						<span className="white-text email">FrontEnd Developer
							<Link to="/logout"><span className="white-text right"><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</span></Link>
						</span>
					</div>
					</li>
					<li className="no-padding">
						<ul className="collapsible collapsible-accordion" data-collapsible="accordion">
							{this.state.Navs.map(function (nav, index) {
								return <Nav key={index} name={nav.name} link={nav.link} category={nav.category} />
							}, this)}
						</ul>
					</li>
				</ul>
				<div className="navbar-fixed">
					<ul id="dropdown" className="dropdown-content">
						<li><Link to="/logout">LogOut</Link></li>
					</ul>
					<nav>
						<div className="nav-wrapper">
							<Link to="#" data-activates="slide-out" className="button-collapse show-on-large"><i className="fa fa-bars fa-large"></i></Link>
							<Link to="/" className="brand-logo"><img src="../images/logo_blue.svg"/></Link>
							<ul className="right hide-on-small-only">
								<li>
									<input type="search" placeholder="Search"/>
									<span className="fa fa-search"/>
								</li>
								<li><i className="fa fa-bell-o fa-large" aria-hidden="true"></i></li>
								<li>
									<div className="name-n-position">
										<span className="name">Abhinav Rai</span><br />
										<span className="position">FrontEnd Developer</span>
									</div>
								</li>
								<li className="profile-pic">
									<img src="../images/user.jpg"/>
								</li>
								<li>
									<a className="dropdown-button" href="/profile" data-activates="dropdown"><i className="fa fa-caret-down" /></a>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</header>
		);
	}
}