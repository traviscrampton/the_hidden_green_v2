class AddDecimals < ActiveRecord::Migration[5.0]
  def change
		remove_column :incomes, :amount
		remove_column :incomes, :name
		remove_column :debts, :amount
		remove_column :spendings, :amount
		remove_column :savings, :amount

		add_column :incomes, :amount, :decimal, :precision => 15, :scale => 8
		add_column :debts, :amount, :decimal, :precision => 15, :scale => 8
		add_column :spendings, :amount, :decimal, :precision => 15, :scale => 8
		add_column :savings, :amount, :decimal, :precision => 15, :scale => 8
  end
end
