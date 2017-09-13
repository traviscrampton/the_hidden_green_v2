class CleanUpAndGoals < ActiveRecord::Migration[5.0]
  def change
		remove_column :months, :name
		remove_column :months, :sequence_num

		create_table :goals do |t|
			t.integer :goalable_id
			t.string :goalable_type
			t.float :amount
		end
  end
end
