class Spending < ActiveRecord::Base
	belongs_to :spendable, polymorphic: true
end
