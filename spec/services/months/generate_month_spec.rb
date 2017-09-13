require "rails_helper"

RSpec.describe Months::GenerateMonth do
		context "Generating a new months finances off of a user initial state" do
			let(:user) { create(:user) }
			let(:month) { Months::CreateMonthDate.new(user: user).call }
			let(:income) { create(:income, incomeable_id: user.id, incomeable_type: user.class.name, amount: 2500.00, name:'The Hidden Green')}
			let(:debt) { create(:debt, debtable_id: user.id, debtable_type: user.class.name, amount: 15000.00, minimum_payment: 100.00, interest_rate: 0.04, name: 'Student Loan')}
			let(:saving) { create(:saving, savingable_id: user.id, savingable_type: user.class.name, amount: 4000.00)}
			let(:spending) { create(:spending, spendable_id: user.id, spendable_type: user.class.name, amount: 1000)}
			let(:service) { Months::GenerateMonth.new(previous_finance: user, month: month)}

		before(:each) do
			month
			income
			debt
			saving
			spending
		end

		it "properly duplicates the new finances" do
			service.create_finances_for_new_month
			expect(month.income.amount).to eq(user.income.amount)
			expect(month.saving.amount).to eq(user.saving.amount)
			expect(month.spending.amount).to eq(user.spending.amount)
			expect(month.debts.first.amount).to eq(user.debts.first.amount)
		end

		# it "properly updates the debt minimum payment" do
		# 	service.create_finances_for_new_month
		# 	total_min_payment = service.total_minimum_payment
		# 	expect(total_min_payment).to eq(100.0)
		# 	expect(month.debts.first.amount).to eq(14900.00)
		# end
		#
		# it "returns a hash with a cashflow object etc" do
		# 	returned_hash = service.call
		# 	expect(returned_hash[:month]).to eq(month)
		# 	expect(returned_hash[:cash_flow].class).to eq(CashFlow)
		# end
	end
end
