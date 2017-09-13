require "rails_helper"

RSpec.describe Months::CalculateCashFlow do
		context "Generating a new months finances off of a user initial state" do
			let(:user) { create(:user)}
			let(:month) { create(:month, user_id: user.id, name:'Test Month')}
			let(:income) { create(:income, incomeable_id: month.id, incomeable_type: month.class.name, amount: 2500.00, name:'The Hidden Green')}
			let(:debt) { create(:debt, debtable_id: month.id, debtable_type: month.class.name, amount: 15000.00, minimum_payment: 100.00, interest_rate: 0.04, name: 'Student Loan')}
			let(:saving) { create(:saving, savingable_id: month.id, savingable_type: month.class.name, amount: 4000.00)}
			let(:spending) { create(:spending, spendable_id: month.id, spendable_type: month.class.name, amount: 1000)}
			let(:service) { Months::CalculateCashFlow.new(month: month)}

		before(:each) do
			month
			income
			debt
			saving
			spending
		end

		it "properly updates the debt minimum payment" do
			service
			total_min_payment = service.total_minimum_payment
			expect(total_min_payment).to eq(100.0)
			expect(month.debts.first.amount).to eq(14900.00)
		end

		it "returns a hash with a cashflow object etc" do
			returned_hash = service.call
			expect(returned_hash[:month]).to eq(month)
			expect(returned_hash[:cash_flow].class).to eq(CashFlow)
		end
	end
end
