function Debt(props){
	return(
		<div>
			name: {props.name}
			amount: {props.amount}
			interest rate: {props.interest_rate}
			minimum monthly payment: {props.minimum_payment}
		</div>
	)
}

Debt.propTypes = {
	name: React.PropTypes.string.isRequired,
	amount: React.PropTypes.number.isRequired,
	interest_rate: React.PropTypes.number.isRequired,
	minimum_payment: React.PropTypes.number.isRequired
}
