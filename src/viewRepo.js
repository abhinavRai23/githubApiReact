import React from "react"
import {Row, Col, Card, Input} from 'react-materialize'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
	constructor(props){
		super(props)
		this.state={
			username:"",
            data: null,
            backup: null,
            forked: "",
            language: "",
            languageOptions: [],
            sort: ""
		}
		this.handleUsername = this.handleUsername.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateData = this.updateData.bind(this)
        this.handleEnter = this.handleEnter.bind(this)
        this.handleForked = this.handleForked.bind(this)
        this.handleLanguage = this.handleLanguage.bind(this)
        this.applyFilter = this.applyFilter.bind(this)
        this.sortData = this.sortData.bind(this)
    }
    updateData(){
        let username = this.state.username
        let that = this
        if(username!=""){
            fetch("https://api.github.com/users/"+username+"/repos")
            .then(function(response) {
                return response.json()
            }).then(function(body) {
                let options = []
                body.forEach( data=> options.push(data.language))
                options = options.filter((elem, pos, arr)=> arr.indexOf(elem)==pos && elem!=null)
                that.setState({languageOptions:options})
                that.setState({data: body})
                that.setState({backup: body})
            })
        }
    }
    handleEnter(e){
		if(e.key==="Enter"){
			this.handleSubmit()
		}
	}
	handleUsername(e){
		if (/^([A-Za-z0-9]+)$/.test(e.target.value) || e.target.value == "") {
            this.setState({ username: e.target.value });
        } else {
            alert("Enter valid username");
        }
	}
	handleSubmit(){
        if (this.state.username != "") {
          this.props.history.push("/" + this.state.username);
        }
        this.updateData()
    }
    applyFilter(){
        let data = this.state.backup
        let language = this.state.language
        let forked = this.state.forked
        if(language!=""){
            data = data.filter(repo=>repo.language==language)
        }
        if(forked!=""){
            data = data.filter(repo=>{
                if( (repo.fork==true && forked=="1") || (repo.fork == false && forked == "0") )
                    return repo
            })
        }
        this.setState({ data: data });
    }
    sortData(e){
        let id = e.target.id
        let sort = this.state.sort
        let data = this.state.data
        $("#"+id).addClass("active")
        if(id!=sort & sort!=""){
            $("#" + sort).removeClass("active");
        }
        function compare(a, b) {
            let param = (id=="create"?"created_at":"updated_at")
            a = Date.parse(a[param])
            b = Date.parse(b[param])
            return a>b? -1: 1
        }
        data.sort(compare)
        this.setState({sort:id})
    }
    handleLanguage(e){
        this.setState({language: e.target.value})
        this.applyFilter()
    }
    handleForked(e){
        this.setState({forked: e.target.value})
        this.applyFilter()
    }
    componentWillMount(){
        this.setState({username: this.props.match.params.id})
    }
    componentDidMount(){
        this.updateData()
        $("select").material_select()
    }
	render() {
        let data = this.state.data
		return <div>
        <Row>
          <Col s={12} className="search-bar">
            <h5 className=" col s9">Github Open Source API</h5>
            <input className="col s2" type="text" name="username" placeholder="Change username" value={this.state.username} onChange={this.handleUsername} onKeyPress={this.handleEnter} />
            <input type="submit" value="CHANGE" className="btn col s1 right" onClick={this.handleSubmit} />
          </Col>
        </Row>
        <Row className="padding-10">
          <Col m={6} className="sort">
            <div className="col s2 padding-top-10">Sort By:</div>
            <div className="col s5">
              <div className="btn blue-grey lighten-1" id="create" onClick={this.sortData}>Created On</div>
            </div>
            <div className="col s5">
              <div className="btn blue-grey lighten-1" id="update" onClick={this.sortData}>Updated On</div>
            </div>
          </Col>
          <Col m={6} className="filter">
            <div className="col s2">Fliter By</div>
            <Input s={5} type="select" label="Language" value={this.state.language} onChange={this.handleLanguage}>
              <option value="" disabled>Choose</option>
              {
                this.state.languageOptions.map( (option, index) => {
                    return(
                        <option value={option} key={index}>{option}</option>
                    )
                })
              }
            </Input>
            <Input s={5} type="select" label="Forked" value={this.state.forked} onChange={this.handleForked}>
              <option value="" disabled>Choose</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </Input>
          </Col>
        </Row>
        <div>
          {data != null ? <Row className="repos">
              {data.map((repo, index) => {
                return <Col s={3} key={index}>
                    <div className="card-panel z-depth-0">
                      <h5 className="center">{repo.name}</h5>
                      <div>
                        <span>Language:</span> {repo.language}
                      </div>
                      <div>
                        <span>
                          Forked:
                        </span> {repo.fork == true ? "Yes" : "No"}
                      </div>
                      <div>
                        <span>Created on:</span> {repo.created_at}
                      </div>
                      <div>
                        <span>Updated on:</span> {repo.updated_at}
                      </div>
                    </div>
                  </Col>;
              })}
            </Row> : null}
        </div>
      </div>;
	}
}
