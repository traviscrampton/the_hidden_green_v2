class DebtsController < ApplicationController

	respond_to :json, only: [:create, :destroy]

	def create
		debt = current_user.debts.new(debt_params)
		debt.save!
		render json: debts_to_currency
	end

	def update
		debt = Debt.find params[:id]
		debt.update(debt_params)
		respond_with debt
	end

	def destroy
		debt = Debt.find(params[:id])
		debt.destroy
		respond_with debt
	end

	private

	def debts_to_currency
		current_user.debts.map do |debt|
			attrs = debt.attributes
			attrs["amount"] = debt.to_currency
			attrs
		end
	end

	def debt_params
		params.permit(:amount, :minimum_payment, :interest_rate, :name)
	end
end
