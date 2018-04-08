import React from "react"
import {Row, Col, Card} from 'react-materialize'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
	constructor(props){
		super(props)
		this.state={
			username:"",
			data: null
		}
		this.handleUsername = this.handleUsername.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleUsername(e){
		this.setState({username: e.target.value})
	}
	handleSubmit(e){
		e.preventDefault()
		this.props.history.push("/"+this.state.username)
	}
	render() {
		return (
			<div>
				<div className="container middle">
					<Row>
						<Col s={6} className="offset-s3 card-panel">
							<h5 className="center">Github API</h5>
							<input className="col s8" type="text" name="username" placeholder="Enter username" value={this.state.username} onChange={this.handleUsername}/>
							<input type="submit" className="btn col s3 right" onClick={this.handleSubmit}/>
						</Col>
					</Row>
                </div>
			</div>
		)
	}
}
