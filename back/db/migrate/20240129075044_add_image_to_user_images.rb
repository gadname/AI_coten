class AddImageToUserImages < ActiveRecord::Migration[7.0]
  def change
    add_column :user_images, :image, :string
  end
end
