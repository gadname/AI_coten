class User < ApplicationRecord
    has_many :posts, dependent: :destroy
    has_many :user_images
end
