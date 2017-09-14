class Setup::Flow

	# this will loop through all the classes in the nav bar and if they exist then it will generate the proper records and make the next one accessable

	NAV_BUTTONS = [
		{
			name:'Income',
			completed: false,
			accessible: true,
			records: []
		},
		{
			name:'Saving',
			completed: false,
			accessible: false,
			records: []
		},
		{
			name:'Spending',
			completed: false,
			accessible: false,
			records: []
		},
		{
			name:'Debts',
			completed: false,
			accessible: false,
			records: []
		}
	]


	attr_reader :user
	def initialize(user)
		@user = user
	end

	def generate
		NAV_BUTTONS.each_with_index do |btn, index|
			finances = user.send(btn[:name].downcase)
			next if finances.blank?
			btn[:completed] = true
			NAV_BUTTONS[index + 1][:accessible] = true unless index == 3
			btn[:records] = finances
		end
		return NAV_BUTTONS
	end

end
