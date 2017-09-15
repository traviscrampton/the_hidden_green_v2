var SingleFinanceForm = React.createClass({

	propTypes: {
		amount: React.PropTypes.number,
		persistFinance: React.PropTypes.func.isRequired
	},

	getInitialState: function(){
		return {
			amount: this.props.amount
		}
	},

	onChange: function(e){
		this.state.amount = e.target.value
		this.setState(this.state)
	},

	onSubmit: function(e){
		e.preventDefault();
		var data = {"amount":this.state.amount}
		this.props.persistFinance(data)
	},

	render: function(){
		return(
			<div className="activebox__block--singleform">
				<form onSubmit={this.onSubmit}>
					<div>
						<span className='activebox__block--persisted'>$</span>
						<input type="number" onChange={this.onChange} value={this.state.amount} />
						<div className="singleSubmit">
							<input type="submit"></input>
						</div>
					</div>
				</form>
			</div>
		)
	}

})
