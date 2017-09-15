var Flow = React.createClass({

	propTypes:{
		navButtons: React.PropTypes.arrayOf(React.PropTypes.shape({
			name: React.PropTypes.string.isRequired,
			completed: React.PropTypes.bool.isRequred,
			accessible: React.PropTypes.bool.isRequired
		}))
	},

	render: function(){
		return(
			<div>
				<NavButtons navButtons={this.props.navButtons} />
			</div>
		)
	}
})
