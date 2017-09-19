class CalculateController < ApplicationController

	def generate
		# wrap this in new service in large container obj
		month = Months::CreateMonthDate.new(user: current_user).call
		Months::GenerateMonth.new(month: month, previous_finance:current_user).create_finances_for_new_month
		cash_flow = Months::CalculateCashFlow.new(month: month).call
		Months::MonthRecommendations.new(cash_flow).call
	end
end
