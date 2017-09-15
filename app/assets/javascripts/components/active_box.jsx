function ActiveBox(props){
	return(
		<div className="activebox__block">
			<div className="activebox__block--prompt">{props.prompt}</div>
			<SingleFinanceForm />
		</div>
	)
}

ActiveBox.propTypes = {
	completed: React.PropTypes.bool.isRequired,
	prompt:React.PropTypes.string.isRequired
}
