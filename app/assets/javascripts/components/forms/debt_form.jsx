var DebtForm = React.createClass({

	propTypes: {
		persistFinance: React.PropTypes.func.isRequired
	},

	getInitialState: function(){
		return {
			name:"",
			amount:"",
			interest_rate:"",
			minimum_payment:""
		}
	},

	onInputChange: function(e){
		var obj = {}
		var key = e.target.name
		obj[key] = e.target.value
		this.setState(obj)
	},

	onSubmit: function(e){
		e.preventDefault();
		this.props.persistFinance(this.state)
		this.clearForm();
	},

	clearForm: function(){
		this.state = this.getInitialState()
		this.setState(this.state)
	},

	render: function(){
		return(
			<form onSubmit={this.onSubmit} className="debt__container__block--form">
				<div>
					<input type="text" name="name" onChange={this.onInputChange} value={this.state.name} placeholder="Name of Debt"/>
				</div>
				<div>
					<input type="number" name="amount" onChange={this.onInputChange} value={this.state.amount} placeholder="Amount e.g. 15000.00" />
				</div>
				<div>
					<input type="number" name="interest_rate" onChange={this.onInputChange} value={this.state.interest_rate} placeholder="interest rate e.g. 0.09" />
				</div>
				<div>
					<input type="number" name="minimum_payment" onChange={this.onInputChange} value={this.state.minimum_payment} placeholder="Minimum Monthly Payment" />
				</div>
				<input type="submit" />
			</form>
		)
	}
})
