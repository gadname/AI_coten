class ChangeImageNotNullInUserImages < ActiveRecord::Migration[7.0]
  def change
    change_column_null :user_images, :image, false
  end
end
