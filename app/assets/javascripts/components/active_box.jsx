function ActiveBox(props){
	return(
		<div className="activebox__block">
			<div className="activebox__block--prompt">{props.prompt}</div>
			{this.formOrObject(props)}
		</div>
	)
}

function formOrObject(props){
	if(props.completed && !props.edit){
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
	edit: React.PropTypes.bool.isRequired,
	persistFinance: React.PropTypes.func.isRequired
}
