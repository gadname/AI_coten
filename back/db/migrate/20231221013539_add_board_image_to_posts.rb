class AddBoardImageToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :board_image, :string
  end
end
