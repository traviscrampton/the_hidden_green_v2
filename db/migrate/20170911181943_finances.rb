class Finances < ActiveRecord::Migration[5.0]
  def change

		create_table :debts do |t|
			t.string :name
			t.string :debtable_type
			t.integer :debtable_id
			t.float :amount
			t.float :interest_rate
			t.float :minimum_payment
			t.timestamps
		end

		create_table :incomes do |t|
			t.integer :incomeable_id
			t.string :incomeable_type
			t.string :name
			t.float :amount
			t.timestamps
		end

		create_table :spendings do |t|
			t.float :amount
			t.integer :spendable_id
			t.string :spendable_type
			t.timestamps
		end

		create_table :savings do |t|
			t.float :amount
			t.integer :savingable_id
			t.string :savingable_type
			t.timestamps
		end

		create_table :months do |t|
			t.integer :user_id
			t.string :name
			t.integer :sequence_num
			t.datetime :date
			t.timestamps
		end
  end
end
