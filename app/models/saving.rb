class Saving < ActiveRecord::Base
	belongs_to :savingable, polymorphic: true

	has_many :goals, as: :goalable
end
