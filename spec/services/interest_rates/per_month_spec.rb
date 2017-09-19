require "rails_helper"

RSpec.describe Months::CalculateCashFlow do
		context "simple amount at first" do
			let(:amount) { BigDecimal.new('1000.00')}
			let(:interest_rate) { BigDecimal.new('0.010') }
			let(:service) { InterestRates::PerMonth.new(amount: amount, interest_rate: interest_rate)}
			it "properly updates the debt minimum payment" do
				interest = service.calculate
				expect(interest.truncate(2).to_s).to eq("1010.04")
			end
		end
end
