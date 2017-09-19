function DebtContainer(props){
	return(
		<div className="debt__container__block cf">
			<DebtForm persistFinance={props.persistFinance}/>
			<div className="debt__container__block--debts">
				{this.handleNoDebts(props)}
			</div>
		</div>
	)
}

function handleNoDebts(props){
	if(props.records.length != 0){
		return(
			props.records.map(function(debt, index){
				return <Debt
					key={index}
					name={debt.name}
					amount={debt.amount}
					interest_rate={debt.interest_rate}
					minimum_payment={debt.minimum_payment}
					deleteDebt={function(){this.handleDebtClick(props, index)}} />
			})
		)
	} else {
		return(
				<div className="no__debts">
					No debts have been entered yet!
				</div>
		)
	}
}

function handleDebtClick(props, index){
	props.deleteDebt(index)
}

DebtContainer.propTypes = {
	records: React.PropTypes.arrayOf(React.PropTypes.shape({
		name: React.PropTypes.string.isRequired,
		amount: React.PropTypes.number.isRequired,
		interest_rate: React.PropTypes.number.isRequired,
		minimum_payment: React.PropTypes.number.isRequired,
	})),
	persistFinance: React.PropTypes.func.isRequired,
	deleteDebt: React.PropTypes.func.isRequired
}
