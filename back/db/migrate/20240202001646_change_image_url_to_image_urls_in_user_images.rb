class ChangeImageUrlToImageUrlsInUserImages < ActiveRecord::Migration[7.0]
  def change
    remove_column :user_images, :image_url, :string
    add_column :user_images, :image_urls, :jsonb, default: {}
  end
end
