class Post < ApplicationRecord
    mount_uploader :image, BoardImageUploader
    belongs_to :user
end
