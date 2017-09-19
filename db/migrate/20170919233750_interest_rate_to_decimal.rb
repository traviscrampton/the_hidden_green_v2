class InterestRateToDecimal < ActiveRecord::Migration[5.0]
  def change
		remove_column :debts, :interest_rate
		add_column :debts, :interest_rate, :decimal, :precision => 15, :scale => 8
  end
end
