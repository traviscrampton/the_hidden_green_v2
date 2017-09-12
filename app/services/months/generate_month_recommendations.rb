class Months::GenerateMonthRecommendations

	attr_reader :previous_finance, :month

	def initialize(args)
		@previous_finance = args[:previous_finance]
		@month = args[:month]
	end

	def call
		create_finances_for_new_month
		create_cash_flow_for_new_month
	end

	def create_cash_flow_for_new_month
		CashFlow.new(income: month.income, spending: spending.amount, total_min_payments: total_minimum_payment)
	end

	def create_finances_for_new_month
		## just do this manually for now
		create_income
		create_saving
		create_spending
		create_debts
	end

	def total_minimum_payment
		total_min_payments = 0
		month.debts.each do |debt|
			total_min_payments += debt.subtract_min_payment
		end
		total_min_payments
	end

	# what I want this to do:
	# 1. First create the new debt, savings, account, etc based off the last previous_finance month/user
	# 2. take out the minimum payment of all the debts and add that to the cash flow
	# 3. Return next month to be ready to go.

	private

	def create_income
		income_attrs = previous_finance.income.attributes.slice("amount", "name")
		month.create_income(income_attrs)
	end

	def create_saving
		saving_attrs = previous_finance.saving.attributes.slice("amount", "name")
		month.create_saving(saving_attrs)
	end

	def create_spending
		spending_attrs = previous_finance.spending.attributes.slice("amount")
		month.create_spending(spending_attrs)
	end

	def create_debts
		previous_finance.debts.each do |debt|
			debt_attrs = debt.attributes.slice("name", "amount", "interest_rate", "minimum_payment")
			month.debts.create(debt_attrs)
		end
	end




end
