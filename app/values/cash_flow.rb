class CashFlow
	include ActiveModel::Validations

	attr_accessor :income, :spending, :amount

	def initialize(args)
		@income = args[:income]
		@spending = args[:spending]
		self.amount = generate_cash_flow
	end

	def generate_cash_flow
		amount = (income.amount - spending.amount).round(2)
		validate_amount(amount)
		return amount
	end

	def validate_amount(amount)
		self.errors.add(:base, "Negative cashflow is not allowed") if amount < 0
	end
end
