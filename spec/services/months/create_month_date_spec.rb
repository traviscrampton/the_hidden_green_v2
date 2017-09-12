require "rails_helper"
require "active_support"

RSpec.describe Months::CreateMonthDate do
	context "user to create first month" do
		let(:user) { create(:user) }
		let(:service) { Months::CreateMonthDate.new(user: user) }


		before(:each) do
			user
			service
		end

		it "It creates a month for the first day of the next month" do
			month = service.call
			target_date = Date.today.at_beginning_of_month.next_month
			expect(month).to be_persisted
			expect(month.date).to eq(target_date)
			expect(month.user).to eq(user)
		end
	end
end
