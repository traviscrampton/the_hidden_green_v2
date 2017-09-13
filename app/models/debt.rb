class Debt < ActiveRecord::Base
	belongs_to :debtable, polymorphic: true


	def subtract_min_payment
		subtracted = minimum_payment <= amount ? minimum_payment : amount
		new_amount = self.amount - subtracted
		self.update(amount: new_amount)
		return subtracted
	end
end