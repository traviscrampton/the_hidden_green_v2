var Flow = React.createClass({

	propTypes:{
		navButtons: React.PropTypes.arrayOf(React.PropTypes.shape({
			name: React.PropTypes.string.isRequired,
			completed: React.PropTypes.bool.isRequred,
			accessible: React.PropTypes.bool.isRequired,
			active: React.PropTypes.bool.isRequired
		}))
	},

	getInitialState: function(){
		return{
			navButtons: this.props.navButtons
		}
	},

	handleButtonClick: function(index){
		var btn = this.state.navButtons[index]
		this.setActiveFalse()
		btn.active = true
		this.setState(this.state)
	},

	setActiveFalse: function(){
		var navButtons = this.state.navButtons
		for(i = 0; i < navButtons.length; ++i){
			navButtons[i].active = false
		}
	},

	render: function(){
		return(
			<div className="navbutton__block">
				{this.state.navButtons.map(function(button, index){
					return <NavButton
						key={index}
						name={button.name}
						completed={button.completed}
						accessible={button.accessible}
						active={button.active}
						buttonClick={function(){this.handleButtonClick(index)}.bind(this)}/>
				}.bind(this))}
			</div>
		)
	}
})
