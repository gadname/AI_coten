class RemoveBoardImageAndPostIdFromPosts < ActiveRecord::Migration[7.0]
  def change
    remove_column :posts, :board_image, :string
    remove_column :posts, :post_id, :integer
    change_column_null :posts, :user_id, false
  end
end
