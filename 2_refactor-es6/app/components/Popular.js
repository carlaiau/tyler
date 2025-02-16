import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import Loading from './Loading'

/* 
If a component does not have state, and just renders,
A stateless functional component, then the following syntax can be used.
Instead of a full class, we can create a function passing in props as the parameter.
Awesome 
*/

function SelectLanguage({selectedLanguage, onSelect} ){
	const languages = ['All', 'Javascript', 'Ruby', 'CSS', 'Python', 'C', 'PHP'];
	return (
		<ul className="languages">
			{languages.map((lang) => (
				<li
					style={lang === selectedLanguage ? {color: "#b0021b"}: null} 
					onClick={() => onSelect(lang)}
					key={lang}>
					{lang}
				</li>
			))}
		</ul>
	)

}


SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

function RepoGrid({repos}){
	return(
		<ul className='popular-list'>
			{repos.map(({name, owner, html_url, stargazers_count}, index) => (
				<li key={name} className='popular-item'>
					<div className='popular-rank'>
						#{index + 1}
					</div>
					<ul className='space-list-items'>
						<li>
							<img className='avatar' 
								src={owner.avatar_url}
								alt={'Avatar for ' + owner.login}
							/>
						</li>
						<li><a href={html_url}>{name}</a></li>
						<li>@{owner.login}</li>
						<li>{stargazers_count} stars</li>
					</ul>
				</li>
				))}
		</ul>
	)
}

RepoGrid.propTypes = {
	 repos: PropTypes.array.isRequired

}
class Popular extends React.Component {
	state = {
		selectedLanguage: 'All',
		repos: null
	}
	updateLanguage = async(lang) => {
		this.setState(() => ({selectedLanguage: lang, repos: null}));

		const repos = await fetchPopularRepos(lang);
		this.setState(() => ({repos}));
	}

	componentDidMount(){
		// AJAX
		this.updateLanguage(this.state.selectedLanguage);
	}
	
	render(){
		const {selectedLanguage, repos} = this.state;
		return (
			<div>
				<SelectLanguage 
					selectedLanguage ={selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				{ !repos ? 
					<Loading/> :
					<RepoGrid repos={repos} /> 
				}
			</div>
		)
	}
}

export default Popular;