class Month < ActiveRecord::Base

	# validates_presence_of :date

	belongs_to :user
	has_one :income, as: :incomeable, dependent: :destroy
	has_one :spending, as: :spendable, dependent: :destroy
	has_one :saving, as: :savingable, dependent: :destroy
	has_many :debts, as: :debtable, dependent: :destroy

	def has_three_months_spending
		saving.amount >= spending.three_months
	end

	# def finances
	# 	return {
	# 		income: income.attributes,
	# 		saving: saving.attributes,
	# 		spending: spending.attributes,
	# 		debt: debts.map { |debt| debt.attributes }
	# 	}.with_indifferent_access
	# end

	def finances
		return [income, saving, spending, debts].group_by { |finance|
			finance.class.name
		}
	end

end
