var React = require('react');
var PropTypes = require('prop-types');

var api = require('../utils/api');
var Loading = require('./Loading');

/* 
If a component does not have state, and just renders,
A stateless functional component, then the following syntax can be used.
Instead of a full class, we can create a function passing in props as the parameter.
Awesome 
*/

function SelectLanguage(props){
	var languages = [
		'All', 'Javascript', 'Ruby', 'CSS', 'Python', 'C', 'PHP'];
	return (
		<ul className="languages">
			{languages.map(function(lang){
				return (
				<li
					style={lang === props.selectedLanguage ? {color: "#b0021b"}: null} 
					onClick={ props.onSelect.bind(null, lang)}
					key={lang}>
					{lang}
				</li>
			)}) // Notice this as 2nd argument of map 
		}
		</ul>
	)

}


SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

function RepoGrid(props){
	return(
		<ul className='popular-list'>
			{props.repos.map(function(repo, index){
				return (
				<li key={repo.name} className='popular-item'>
					<div className='popular-rank'>
						#{index + 1}
					</div>
					<ul className='space-list-items'>
						<li>
							<img className='avatar' 
								src={repo.owner.avatar_url}
								alt={'Avatar for ' + repo.owner.login}
							/>
						</li>
						<li><a href={repo.html_url}>{repo.name}</a></li>
						<li>@{repo.owner.login}</li>
						<li>{repo.stargazers_count} stars</li>
					</ul>
				</li>
				)
			})}
		</ul>
	)
}

RepoGrid.propTypes = {
	 props: PropTypes.array.isRequired

}
class Popular extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selectedLanguage: 'All',
			repos: null
		};

		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount(){
		// AJAX
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(lang){
		this.setState(function(){
			return {
				selectedLanguage: lang
			};

		});
		api.fetchPopularRepos(lang)
			.then(function(repos){
				this.setState(function(){
					return {
						repos: repos
					}
				});
			}.bind(this));
	}
	render(){
		return (
			<div>
				<SelectLanguage 
					selectedLanguage ={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				{ !this.state.repos ? 
					<Loading/> :
					<RepoGrid repos={this.state.repos} /> 
				}
			</div>
		)
	}
}

module.exports = Popular;