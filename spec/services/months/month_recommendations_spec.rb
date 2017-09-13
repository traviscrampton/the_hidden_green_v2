require "rails_helper"

RSpec.describe Months::MonthRecommendations do
	let(:user) { create(:user) }
	let(:month) { Months::CreateMonthDate.new(user: user).call }
	let(:income) { create(:income, incomeable_id: month.id, incomeable_type: month.class.name, amount: 2500.00, name:'The Hidden Green')}
	let(:debt) { create(:debt, debtable_id: month.id, debtable_type: month.class.name, amount: 15000.00, minimum_payment: 100.00, interest_rate: 0.04, name: 'Student Loan')}
	let(:spending) { create(:spending, spendable_id: month.id, spendable_type: month.class.name, amount: 1000)}
	let(:month_and_cash_flow) { Months::CalculateCashFlow.new(month: month).call}
	let(:service) { Months::MonthRecommendations.new(month_and_cash_flow)}

		context "transfer cash flow to savings" do
			context 'transfers all cash_flow towards savings' do
				let(:saving) { create(:saving, savingable_id: month.id, savingable_type: month.class.name, amount: 1000.00)}

				before(:each) do
					month
					income
					debt
					saving
					spending
				end

				it "transfers all of the cashflow to savings" do
					service.call
					saving.reload
					expect(saving.goals.first.amount).to eq(1400.0)
					expect(saving.amount).to eq(2400.00)
				end
			end

		context "transfers part of cash flow towards savings" do
			let(:saving) { create(:saving, savingable_id: month.id, savingable_type: month.class.name, amount: 2500.00)}

			before(:each) do
				month
				income
				debt
				saving
				spending
			end

			it "transfers the proper amount to savings" do
				service.call
				saving.reload
				expect(saving.goals.first.amount).to eq(500.0)
				expect(saving.amount).to eq(3000.00)
			end
		end
	end

	context "transfer all cashflow to single debt" do
		# cashflow will be 1400 to begin with
		let(:saving) { create(:saving, savingable_id: month.id, savingable_type: month.class.name, amount: 3000.00)}

		before(:each) do
			month
			income
			debt
			saving
			spending
		end

		it "transfers all cashflow towards the single debt" do
			service.call
			debt.reload
			expect(debt.goals.first.amount).to eq(1400.0)
			expect(debt.amount).to eq(13500.0)
		end
	end

	context "transfers all cashflow between two debts" do
		let(:saving) { create(:saving, savingable_id: month.id, savingable_type: month.class.name, amount: 3000.00)}
		let(:debt) { create(:debt, name:'credit card', amount: 1000.0, minimum_payment:50.0, debtable_id:month.id, debtable_type:month.class.name, interest_rate: 0.08)}
		let(:debt_1) { create(:debt, name:'Student Loan', amount: 200.0, minimum_payment:25.0, debtable_id:month.id, debtable_type:month.class.name, interest_rate: 0.05)}

		before(:each) do
			month
			income
			debt
			debt_1
			saving
			spending
		end

		# cashflow to be 1425.0

		it "knocks out all the debts" do
			service.call
			debt.reload
			debt_1.reload
			expect(debt.goals.first.amount).to eq(950.0)
			expect(debt_1.goals.first.amount).to eq(175.0)
			expect(debt.amount).to eq(0)
			expect(debt_1.amount).to eq(0)
		end
	end

	context "transfers some cash flow between debts but can't pay everything" do
		let(:saving) { create(:saving, savingable_id: month.id, savingable_type: month.class.name, amount: 3000.00)}
		let(:debt) { create(:debt, name:'credit card', amount: 300.0, minimum_payment:100.0, debtable_id:month.id, debtable_type:month.class.name, interest_rate: 0.08)}
		let(:debt_1) { create(:debt, name:'Student Loan', amount: 10000.0, minimum_payment:100.0, debtable_id:month.id, debtable_type:month.class.name, interest_rate: 0.05)}

		before(:each) do
			month
			income
			debt
			debt_1
			saving
			spending
		end

		it "knocks out all the debts" do
			service.call
			debt.reload
			debt_1.reload
			expect(debt.goals.first.amount).to eq(200.0)
			expect(debt_1.goals.first.amount).to eq(1100.0)
			expect(debt.amount).to eq(0)
			expect(debt_1.amount).to eq(8800.0)
		end
	end
end
