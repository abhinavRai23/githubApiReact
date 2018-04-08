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
        this.updateData = this.updateData.bind(this)
    }
    updateData(){
        let username = this.state.username
        let that = this
        if(username!=""){
            fetch("https://api.github.com/users/"+username+"/repos")
            .then(function(response) {
                return response.json()
            }).then(function(body) {
                that.setState({data: body})
            })
        }
    }
	handleUsername(e){
		this.setState({username: e.target.value})
	}
	handleSubmit(e){
		e.preventDefault()
        this.props.history.push("/"+this.state.username)
        this.updateData()
    }
    componentWillMount(){
        this.setState({username: this.props.match.params.id})
    }
    componentDidMount(){
        this.updateData()
    }
	render() {
        let data = this.state.data
		return (
			<div>
                <Row>
                    <Col s={12} className="search-bar">
                        <h5 className=" col s9">Github Open Source API</h5>
                        <input className="col s2" type="text" name="username" placeholder="Change username" value={this.state.username} onChange={this.handleUsername}/>
                        <input type="submit" value="CHANGE" className="btn col s1 right" onClick={this.handleSubmit}/>
                    </Col>
                </Row>
				<div className="padding-top-20">
                    {
                        data!=null?
                            <Row className="repos">
                                {
                                    data.map((repo, index)=>{
                                        return(
                                            <Col s={12} key={index}>
                                                <div className="card-panel">
                                                    <div><span>Name:</span> {repo.name}</div>
                                                    <div><span>Language:</span> {repo.language}</div>
                                                    <div><span>Forked:</span> {repo.fork==true? "Yes": "NO"}</div>
                                                    <div><span>Created on:</span> {repo.created_at}</div>
                                                    <div><span>Updated on:</span> {repo.updated_at}</div>
                                                </div>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        :null
                    }
                </div>
			</div>
		)
	}
}
