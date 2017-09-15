function NavButtons(props){

	return(
		<div className="navbutton__block">
			{props.navButtons.map(function(button, index){
				return <NavButton
					key={index}
					name={button.name}
					completed={button.completed}
					accessible={button.accessible}/>
			})}
		</div>
	)

}

NavButtons.propTypes = {
	navButtons: React.PropTypes.arrayOf(React.PropTypes.shape({
		name: React.PropTypes.string.isRequired,
		completed: React.PropTypes.bool.isRequred,
		accessible: React.PropTypes.bool.isRequired
	}))
}
