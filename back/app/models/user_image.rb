class UserImage < ApplicationRecord
    belongs_to :user
    validates :user_id, uniqueness: true
  # Add validations as needed, for example:
  
    
end
