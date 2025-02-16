import React from 'react'
import PropTypes from 'prop-types'

var styles = {
	content: {
		textAlign: 'center',
		fontSize: '35px'
	}
}
class Loading extends React.Component{
	state = {
		text: this.props.text
	}
	static propTypes = {
		text: PropTypes.string.isRequired,
		speed: PropTypes.number.isRequired
	}
	static defaultProps = {
		text: 'Loading',
		speed: 300
	}

	componentDidMount(){
		const { speed, text} = this.props;
		const stopper = text  + '...';

		this.interval = window.setInterval(() =>{
			text === stopper 
			? this.setState(() => ({text: text }))
			: this.setState((prevState) => ({text: `${prevState.text}.`}))			
		}, speed);
	}

	componentWillUnmount(){
		window.clearInterval(this.interval);
	}

	render(){
		return(
			<p style={styles.content}>
			{this.state.text}		
			</p>
		)
	}
}



export default Loading