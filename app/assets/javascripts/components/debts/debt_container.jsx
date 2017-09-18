function DebtContainer(props){
	return(
		<div className="debt__container__block cf">
			<DebtForm persistFinance={props.persistFinance}/>
			<div className="debt__container__block--debts">
				{props.records.map(function(debt, index){
					return <Debt
						key={index}
						name={debt.name}
						amount={debt.amount}
						interest_rate={debt.interest_rate}
						minimum_payment={debt.minimum_payment} />
				})}
			</div>
		</div>
	)
}

DebtContainer.propTypes = {
	records: React.PropTypes.arrayOf(React.PropTypes.shape({
		name: React.PropTypes.string.isRequired,
		amount: React.PropTypes.number.isRequired,
		interest_rate: React.PropTypes.number.isRequired,
		minimum_payment: React.PropTypes.number.isRequired,
	})),
	persistFinance: React.PropTypes.func.isRequired
}
