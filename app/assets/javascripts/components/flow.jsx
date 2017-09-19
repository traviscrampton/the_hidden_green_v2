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
		var calculation = this.readyForCalculation(this.props.navButtons)
		return{
			navButtons: this.props.navButtons,
			activeFinance: this.setActiveFinance(),
			readyForCalculation: calculation
		}
	},

	readyForCalculation: function(categories){
		var falseCategories = categories.find(function(btn){
			return btn.completed == false
		})

		return falseCategories == undefined
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
			this.state.activeFinance = this.state.navButtons[index + 1]
		}
		var calculation = this.readyForCalculation(this.state.navButtons)
		this.state.readyForCalculation = calculation
		this.setState(this.state)
	},

	deleteDebt: function(index){
		var debt = this.state.activeFinance.records[index]
		var url = this.state.activeFinance.url + `/${debt.id}`
		$.ajax({
			url: url,
			type: "DELETE",
			context: this,
			data: debt,
			success: function(response){
				this.handleDebtRemoval(index)
			}, error: function(response){
				console.log("That did not work")
			}
		})
	},

	handleDebtRemoval: function(index){
		var activeFinance = this.state.activeFinance
		activeFinance.records.splice(index, 1);
		if(activeFinance.records.length == 0){
			activeFinance.completed = false
		}
		var calculation = this.readyForCalculation(this.state.navButtons)
		this.state.readyForCalculation = calculation
		this.setState(this.state)
	},

	render: function(){
		return(
			<div id="flow">
				<div className="header__block">
					<div className="header__block--title">Let's get out of debt</div>
					<div className="header__block--subtext">But first we need some basic finances</div>
				</div>
				<div className="calculation__button">
					{this.state.readyForCalculation ?
						<form action="/calculate">
							<button>Calculate Debt Plan</button>
						</form> : ""
					}
				</div>
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
					name={this.state.activeFinance.name}
					persistFinance={this.persistFinance}
					deleteDebt={this.deleteDebt} />
			</div>
		)
	}
})
