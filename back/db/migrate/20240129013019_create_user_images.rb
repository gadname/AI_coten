class CreateUserImages < ActiveRecord::Migration[7.0]
  def change
    create_table :user_images do |t|
      t.references :user, null: false, foreign_key: true
      t.string :image_url, null: false
      t.string :name
      t.text :description
      t.integer :file_size
      t.string :content_type
      t.string :status

      t.timestamps
    end
  end
end
