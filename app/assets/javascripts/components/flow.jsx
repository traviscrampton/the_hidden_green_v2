class Flow extends React.Component{

	constructor(props, context){
		super(props, context);

		this.state = {
			navButtons: this.props.navButtons,
			activeFinance: this.setActiveFinance(),
			calculation: this.readyForCalculation(this.props.navButtons)
		}
	}

	readyForCalculation(categories){
		let falseCategories = categories.find((btn) => {
			return btn.completed == false
		})

		return falseCategories == undefined
	}

	handleButtonClick(index){
		this.state.activeFinance = this.state.navButtons[index]
		this.setState(this.state)
	}

	setActiveFinance(){
		let isActive = this.props.navButtons.find((btn) => {
			return btn.active == true
		})
		return isActive
	}

	persistFinance(data){
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
	}

	handleSuccess(finance){
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
	}

	deleteDebt(index){
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
	}

	handleDebtRemoval(index){
		var activeFinance = this.state.activeFinance
		activeFinance.records.splice(index, 1);
		if(activeFinance.records.length == 0){
			activeFinance.completed = false
		}
		var calculation = this.readyForCalculation(this.state.navButtons)
		this.state.readyForCalculation = calculation
		this.setState(this.state)
	}

	render(){
		return(
			<div id="flow">
				<div className="header__block">
					<div className="header__block--title">Let's get out of debt</div>
					<div className="header__block--subtext">But first we need some basic finances</div>
				</div>
				<div className="calculation__button">
					{this.state.readyForCalculation ?
						<form action="/months" method="POST">
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
}

Flow.PropTypes = {
	navButtons: React.PropTypes.arrayOf(React.PropTypes.shape({
		name: React.PropTypes.string.isRequired,
		completed: React.PropTypes.bool.isRequred,
		accessible: React.PropTypes.bool.isRequired,
		active: React.PropTypes.bool.isRequired,
		prompt:React.PropTypes.string.isRequired
	}))
}
