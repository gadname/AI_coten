class CreateApiV1Posts < ActiveRecord::Migration[7.0]
  def change
    create_table :api_v1_posts do |t|

      t.timestamps
    end
  end
end
