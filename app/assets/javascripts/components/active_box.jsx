function ActiveBox(props){
	return(
		<div className="activebox__block">
			<div className="activebox__block--prompt">{props.prompt}</div>
			{this.formOrObjectOrDebt(props)}
		</div>
	)
}

function formOrObjectOrDebt(props){
	if(props.name == "Debts"){
		return <DebtContainer deleteDebt={props.deleteDebt} persistFinance={props.persistFinance} records={props.record}/>
	} else if(props.completed){
		return(
			<div className="activebox__block--persisted">$ {props.record.amount}</div>
		)
	} else {
		return <SingleFinanceForm persistFinance={props.persistFinance} />
	}
}

ActiveBox.propTypes = {
	completed: React.PropTypes.bool.isRequired,
	prompt:React.PropTypes.string.isRequired,
	persistFinance: React.PropTypes.func.isRequired,
	deleteDebt: React.PropTypes.func.isRequired
}
