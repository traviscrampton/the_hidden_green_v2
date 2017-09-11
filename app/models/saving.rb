class Saving < ActiveRecord::Base
	belongs_to :savingable, polymorphic: true
end
