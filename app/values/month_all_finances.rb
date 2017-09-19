class MonthAllFinances

	attr_reader :month
	def initialize(args)
		@month = args[:month]
	end

	def call
		month.finances.each do |klass, value|
			attrs = value.map {|val| val.attributes}
		end
	end
end
