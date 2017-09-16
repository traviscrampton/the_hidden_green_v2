var DebtForm = React.createClass({

	getInitialState: function(){
		return {
			name:"",
			amount:"",
			interest_rate:"",
			minimum_payment:"",
			percentage:"0%"

		}
	},

	onInputChange: function(e){
		var obj = {}
		var key = e.target.name
		obj[key] = e.target.value
		this.setState(obj)
	},

	percentageThenUpdate: function(e){
		var percent = ((e.target.value)*100).toString()
		percent += "%"
		this.state.percentage = percent
		this.onInputChange(e)
	},

	render: function(){
		return(
			<form className="debt__container__block--form">
				<div>
					<input type="text" name="name" onChange={this.onInputChange} value={this.state.name} placeholder="Name of Debt"/>
				</div>
				<div>
					<input type="number" name="amount" onChange={this.onInputChange} value={this.state.amount} placeholder="Amount e.g. 15000.00" />
				</div>
				<div>
					<input type="number" name="interest_rate" onChange={this.percentageThenUpdate} value={this.state.interest_rate} placeholder="interest rate e.g. 0.09" />
					<span className="percentage__translator">{this.state.percentage}</span>
				</div>
				<div>
					<input type="number" name="minimum_payment" onChange={this.onInputChange} value={this.state.minimum_payment} placeholder="Minimum Monthly Payment" />
				</div>
				<input type="submit" />
			</form>
		)
	}
})
