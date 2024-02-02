class AddKeyToUserImages < ActiveRecord::Migration[7.0]
  def change
    add_column :user_images, :key, :string
  end
end
