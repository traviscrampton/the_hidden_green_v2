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
		this.state.amount = ""
		this.setState(this.state)
		this.props.persistFinance(data)
	},

	render: function(){
		return(
			<div className="activebox__block--singleform">
				<form onSubmit={this.onSubmit}>
					<div className="input_and_submit">
						$<input autoFocus='true' placeholder="1500.00" type="number" onChange={this.onChange} value={this.state.amount} />
					<label>
						<svg height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0h24v24H0z" fill="none"/>
							<path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
						</svg>
						<input type="submit" />
					</label>
					</div>
				</form>
			</div>
		)
	}

})
