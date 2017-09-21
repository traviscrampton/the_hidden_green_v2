import PropTypes from 'prop_types'

function Header(props){
	return(
		<div className="header__block">
			<div className="header__block--title">
				{props.bigText}
			</div>
			<div className="header__block--subtext">
				{props.subText}
			</div>
		</div>
	)
}

Header.PropTypes = {
	bigText: PropTypes.string.isRequired,
	subText: PropTypes.string.isRequired
}
