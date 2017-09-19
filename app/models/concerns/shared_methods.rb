module SharedMethods
	extend ActiveSupport::Concern

	def to_currency
		sprintf("%.2f", amount.truncate(2))
	end
end
