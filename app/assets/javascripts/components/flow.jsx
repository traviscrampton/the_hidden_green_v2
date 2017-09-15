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
			navButtons: this.props.navButtons,
			activeFinance: this.setActiveFinance()
		}
	},

	handleButtonClick: function(index){
		this.state.activeFinance = this.state.navButtons[index]
		this.setState(this.state)
	},

	setActiveFinance: function(){
		var isActive = this.props.navButtons.find(function(btn){
			return btn.active == true
		})
		return isActive
	},

	persistFinance: function(data){
		$.ajax({
			url: this.state.activeFinance.url,
			type: 'POST',
			context: this,
			data: data,
			success: function(finance){
				this.handleSuccess(finance)
			}, error: function(){
				console.log("There has been a grave mistake")
			}
		})
	},

	handleSuccess: function(finance){
		var activeFinance = this.state.activeFinance
		activeFinance.completed = true
		activeFinance.records = finance
		var index = this.state.navButtons.indexOf(activeFinance)
		if(index < 3){
			this.state.navButtons[index + 1].accessible = true
		}
		this.setState(this.state)
	},

	render: function(){
		return(
			<div>
				<div className="navbutton__block">
					{this.state.navButtons.map(function(button, index){
						return <NavButton
							key={index}
							name={button.name}
							completed={button.completed}
							accessible={button.accessible}
							active={this.state.activeFinance == button}
							prompt={button.prompt}
							buttonClick={function(){this.handleButtonClick(index)}.bind(this)}/>
					}.bind(this))}
				</div>
				<ActiveBox
					completed={this.state.activeFinance.completed}
					prompt={this.state.activeFinance.prompt}
					record={this.state.activeFinance.records}
					edit={false}
					persistFinance={this.persistFinance} />
			</div>
		)
	}
})
