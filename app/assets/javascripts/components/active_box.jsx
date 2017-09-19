function ActiveBox(props){
	return(
		<div className="activebox__block">
			{this.formOrObjectOrDebt(props)}
		</div>
	)
}

function formOrObjectOrDebt(props){
	if(props.name == "Debts"){
		return <DebtContainer deleteDebt={props.deleteDebt} persistFinance={props.persistFinance} records={props.record}/>
	} else if(props.completed){
		return(
			<div className="activeBox__block--box">
				<div className="activebox__block--prompt">
					{props.prompt}
				</div>
				<div className="activebox__block--persisted">
					$ {props.record.amount}
				</div>
			</div>
		)
	} else {
		return(
			<div className="activeBox__block--box">
				<div className="activebox__block--prompt">
					{props.prompt}
				</div>
				<SingleFinanceForm persistFinance={props.persistFinance} />
			</div>
		)
	}
}

ActiveBox.propTypes = {
	completed: React.PropTypes.bool.isRequired,
	prompt:React.PropTypes.string.isRequired,
	persistFinance: React.PropTypes.func.isRequired,
	deleteDebt: React.PropTypes.func.isRequired
}
