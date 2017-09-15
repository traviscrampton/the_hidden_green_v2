var Flow = React.createClass({

	propTypes:{
		navButtons: React.PropTypes.arrayOf(React.PropTypes.shape({
			name: React.PropTypes.string.isRequired,
			completed: React.PropTypes.bool.isRequred,
			accessible: React.PropTypes.bool.isRequired,
			active: React.PropTypes.bool.isRequired,
			prompt:React.PropTypes.string.isRequired
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
		var isActive = this.activeFinance()
		isActive.active = false
	},

	activeFinance: function(){
		var isActive = this.state.navButtons.find(function(btn){
			return btn.active == true
		})
		return isActive
	},

	render: function(){
		var activeFinance = this.activeFinance()
		return(
			<div>
				<div className="navbutton__block">
					{this.state.navButtons.map(function(button, index){
						return <NavButton
							key={index}
							name={button.name}
							completed={button.completed}
							accessible={button.accessible}
							active={button.active}
							prompt={button.prompt}
							buttonClick={function(){this.handleButtonClick(index)}.bind(this)}/>
					}.bind(this))}
				</div>
				<ActiveBox completed={activeFinance.completed} prompt={activeFinance.prompt} record={activeFinance.records} edit={false} /> 
			</div>
		)
	}
})
