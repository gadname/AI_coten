class Post < ApplicationRecord
    mount_uploader :image, BoardImageUploader
end
