require "rails_helper"
RSpec.describe CashFlow do

	context "monthly income greater than monthly spending" do

		let(:user) { create(:user) }
		let(:income) { create(:income, amount: 4000.00, incomeable_id: user.id, incomeable_type: user.class.name)}
		let(:spending) { create(:spending, amount: 2000.00, spendable_id: user.id, spendable_type: user.class.name)}
		let(:cash_flow) { CashFlow.new(income: income, spending: spending) }

		before(:each) do
			cash_flow
		end

		it "calculates a positive cashflow" do
			expect(cash_flow.amount).to eq(2000.00)
		end
	end

	context "monthly income is less than monthly spending" do
		let(:user) { create(:user) }
		let(:income) { create(:income, amount: 2000.00, incomeable_id: user.id, incomeable_type: user.class.name)}
		let(:spending) { create(:spending, amount: 4000.00, spendable_type:user.class.name, spendable_id: user.id)}
		let(:cash_flow) { CashFlow.new(income: income, spending: spending)}

		before(:each) do
			cash_flow
		end

		it "spits back an error on cashflow" do
			expect(cash_flow.errors.any?).to eq(true)
			expect(cash_flow.errors.full_messages).to include("Negative cashflow is not allowed")
		end
	end
end
