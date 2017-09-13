class Month < ActiveRecord::Base

	# validates_presence_of :date

	belongs_to :user
	has_one :income, as: :incomeable
	has_one :spending, as: :spendable
	has_one :saving, as: :savingable
	has_many :debts, as: :debtable

	def has_three_months_spending
		saving.amount >= spending.three_months
	end

end
