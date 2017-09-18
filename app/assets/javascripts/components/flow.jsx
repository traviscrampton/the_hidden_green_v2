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
			activeFinance: this.setActiveFinance(),
			readyForCalculation: this.readyForCalculation(this.props.navButtons)
		}
	},

	readyForCalculation: function(categories){
		// need to find if all instances of complete, four different levels, also need to handle this on delete.
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
		this.state.readyForCalulation = calculation	
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
		// find the debt at the index, then find its ID, in the success callback remove it from the array of state and then set the state
	},

	handleDebtRemoval: function(index){
		this.state.activeFinance.records.splice(index, 1);
		this.setState(this.state)
	},

	render: function(){
		return(
			<div>
				ready for calculation is {this.state.readyForCalculation.toString()}
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
