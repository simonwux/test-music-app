import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Login from './Login.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import Genre from './Genre.js';
import { Songs } from '../api/Song.js';
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import { Users } from '../api/Users.js';
class LandingPage extends Component {

  constructor(props) {
	    super(props);
	    this.state = {
			loading: false,
			genres:["acoustic","afrobeat","alt-rock","alternative","ambient","anime","black-metal","bluegrass","blues",
					"bossanova","brazil","breakbeat","british","cantopop","chicago-house","children","chill","classical","club",
					"comedy","country","dance","dancehall","death-metal","deep-house","detroit-techno","disco","disney","drum-and-bass",
					"dub","dubstep","edm","electro","electronic","emo","folk","forro","french","funk","garage","german","gospel",
					"goth","grindcore","groove","grunge","guitar","happy","hard-rock","hardcore","hardstyle","heavy-metal",
					"hip-hop","holidays","honky-tonk","house","idm","indian","indie","indie-pop","industrial","iranian","j-dance",
					"j-idol","j-pop","j-rock","jazz","k-pop","kids","latin","latino","malay","mandopop","metal","metal-misc",
					"metalcore","minimal-techno","movies","mpb",
					"new-age","new-release","opera","pagode","party","philippines-opm","piano","pop","pop-film","post-dubstep","power-pop",
					"progressive-house","psych-rock","punk","punk-rock","r-n-b","rainy-day","reggae","reggaeton","road-trip","rock","rock-n-roll","rockabilly","romance",
					"sad","salsa","samba","sertanejo",
					"show-tunes","singer-songwriter","ska","sleep","songwriter","soul","soundtracks","spanish",
					"study","summer","swedish","synth-pop","tango","techno","trance","trip-hop","turkish","work-out","world-music"
  			],
  			tracks:[],
  			userLogIn: false,
  			useremail: "",
  			discussion: this.props.song,
  			first: false,
  			showLastFive: false,
			last: [],
			default: true,
			sortLike: false,
			sortComment: false
		};
		this.getData = this.getData.bind(this)
		this.start = this.start.bind(this)
		this.renderDiscussion = this.renderDiscussion.bind(this)
		this.renderDiscussionByVotes = this.renderDiscussionByVotes.bind(this)
		this.renderDiscussionByComment = this.renderDiscussionByComment.bind(this)
		this.show = this.show.bind(this)

	}

	componentDidMount(){
		
		Meteor.call("song.display", (err, songs) =>{
				console.log(songs)
				if(err) {
					alert(err);
				}
				if(songs){
					this.setState({
						discussion: songs
					})
					
				}
			}
		);
		console.log(this.state.discussion)
		
	}

	  handler() {
	  	const pre = this.state.userLogIn;
	    this.setState({
	      userLogIn: !pre
	    })
	  }

  start(){
  	this.setState({
  		first: true
  	})
  }
  getData(val){
  	const pre = this.state.userLogIn;
  	console.log(val)
  	this.setState({
  		useremail: val,
  		userLogIn: true
  	})
  	console.log(this.state.useremail);
  	console.log(this.state.userLogIn);
  }
  

	showLastFive(){
		
		const pre = this.state.showLastFive;
		this.setState({
			showLastFive: !pre
		})
		console.log(this.props.user);
		console.log(this.state.useremail);

	}
	show(){
		return this.props.user.find( u => {return u.email === this.state.useremail }).history.slice(-5).map(d => 
  			<div key = {d.toString()} role="list">
  				<div role="listitem">
  				<h6>{d}</h6>
				</div>
			</div>
		)
	}

  renderDiscussionByVotes(){


	return this.props.song.sort((a,b) => (b.votes - a.votes)).map(d => 
  			<div key = {d._id}>
	  			<h2>Song Name: { d.name }</h2>
	  			<h2>🔥: { d.votes }</h2>
	  			<div role="list">
	  				<div role="listitem">
	  				{d.comment.map( c => 
	  					<div role="list">
	  					<li key={c.toString()}>
	  						{c}
	  					</li>
	  					</div>
	  				)}
	  				</div>
	  			</div>

			</div>
	)
  }

  renderDiscussionByComment(){	
  	return this.props.song.sort((a,b) => (b.num - a.num)).map(d => 
  			<div key = {d._id}>
	  			<h2>Song Name: { d.name }</h2>
	  			<h2>🔥: { d.votes }</h2>
	  			<div role="list">
					<div role="listitem">
	  				{d.comment.map( c => 
	  					<div role="list">
	  					<li key={c.toString()}>
	  						{c}
	  					</li>
	  					</div>
	  				)}
	  				</div>
	  			</div>

			</div>
	)
  }
  renderDiscussion(){
  	  	return this.props.song.map(d => 
  			<div key = {d._id}>
	  			<h2>Song Name: { d.name }</h2>
	  			<h2>🔥: { d.votes }</h2>
	  			<div role="list">
	  				<div role="listitem">
	  				{d.comment.map( c => 
	  					<div role="list">
	  					<li key={c.toString()}>
	  						{c}
	  					</li>
	  					</div>
	  				)}
	  				</div>
	  			</div>

			</div>
	)
  }



  

  sortByLike(){
	const pre = this.state.sortLike
	const pre1 = this.state.sortComment
	this.setState({
		sortLike: true,
		sortComment: false
	})
  }
  sortByComment(){
	const pre = this.state.sortComment
	this.setState({
		sortComment: true,
		sortLike: false
	})
  }

  logout(){
  		const pre = this.state.userLogIn
		this.setState({
			userLogIn: !pre
		})
	}
  render() {
  	const name = "holidays";
  	const isLogIn = this.state.userLogIn;
  	const start = this.state.first;
  	const show = this.state.showLastFive;
  	const de = this.state.default
  	const sortLike = this.state.sortLike
  	const sortComment = this.state.sortComment
    return (
      <div className='landing-container'>
        <div className='landing-title-container' role='main'>
          <Grid container spacing={24}>
          <Grid item xs={6}>
          	
	          <Login sendData={this.getData} isLogIn={this.state.userLogIn}/>
	          
			  <button aria-label='Get started' className='btn' onClick={this.sortByLike.bind(this)}>Most Top Ten Likes🔥</button>
			  <button aria-label='Get started' className='btn' onClick={this.sortByComment.bind(this)}>Most Top Ten Comments🔥</button>
	          <h1>Latest Discussion</h1>
	          {
					sortLike 
					
					?
						this.renderDiscussionByVotes()
					: 
					(
						sortComment

						? 
						
						this.renderDiscussionByComment()

						: 

						this.renderDiscussion()
					)
					
	          }
	        
          </Grid>
		
          <Grid item xs={6}>
          	
          	<div position="right">
          	{
				isLogIn
          
				? 
				<div>
				<button className='float-right' onClick={this.logout.bind(this)}> Log Out? </button> :
				<button aria-label='Get started' className='btn' onClick={this.showLastFive.bind(this)}>Show Activity</button>
				{
					show 

					? 
					
					this.show()

					: 

					""
				}
			  	<Genre name={name} useremail={this.state.useremail}/>
          		</div>
				:

				<div></div>
          	}
          	</div>
		  </Grid>
		  </Grid>
          </div>
      </div>
    );
  }
}



export default withTracker(() => {
  Meteor.subscribe("Songs");
  Meteor.subscribe("Users");
  console.log("307")
  return {
    song: Songs.find({}).fetch(),
    user: Users.find({}).fetch()
  };
})(LandingPage);

