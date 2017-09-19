class IncomesController < ApplicationController

	respond_to :json, only: [:create, :update, :destroy]

	def create
		income = current_user.build_income(income_params)
		income.save!
		render json: income.currency_attrs
	end

	def update
		income = Income.find params[:id]
		income.update(income_params)
		respond_with income
	end

	def destroy
		income = Income.find(params[:id])
		income.destroy
		respond_with income
	end

	private

	def income_params
		params.permit(:amount)
	end
end
