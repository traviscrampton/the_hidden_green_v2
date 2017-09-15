class Setup::Flow

	# this will loop through all the classes in the nav bar and if they exist then it will generate the proper records and make the next one accessable

	NAV_BUTTONS = [
		{
			name:'Income',
			completed: false,
			prompt:"On average and after tax how much money do you make in a month?",
			accessible: true,
			active: true,
			records: []
		},
		{
			name:'Saving',
			completed: false,
			prompt:"Combining your checking account and savings how much money do you have on hand?",
			accessible: false,
			active: false,
			records: []
		},
		{
			name:'Spending',
			completed: false,
			prompt:"On average in a given month how much money do you spend?",
			accessible: false,
			active: false,
			records: []
		},
		{
			name:'Debts',
			completed: false,
			prompt:"What are your current debts?",
			accessible: false,
			active: false,
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
