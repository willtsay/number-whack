class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :email
      t.string :picture
      t.integer :high_score, default: 0
    end
  end
end
