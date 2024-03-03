class Api::V1::OurImagesController < ApplicationController
    skip_before_action :set_current_user, only: [:show]
    before_action :set_current_user
    
    def create
      user_image = UserImage.find_or_initialize_by(user_id: user_image_params[:user_id])
      user_image.image_urls = user_image_params[:image_urls] # 修正: :image_url -> :image_urls
      
      if user_image.save
        render json: { message: "Image uploaded successfully." }, status: :created
      else
        render json: { error: "Failed to upload image." }, status: :unprocessable_entity
      end # 追加: end キーワード
    end
  
    def index
      return if User.all.count < 2 
      random_number = loop do
        number = rand(1..User.last.id)
        break number unless number == @current_user.id
      end
      Rails.logger.info "random_number: #{random_number}"
      user_image = UserImage.find_by(user_id: random_number)
      Rails.logger.info "user_image: #{user_image}"
      if user_image.present?
        render json: user_image.image_urls, status: :ok
      else
        render json: {}, status: :not_found
      end
    end
  
    def show
    end
  
    def update_urls
      user = @current_user
      unless current_user
        render json: { error: "User does not exist." }, status: :not_found
        return
      end
  
      user_image = UserImage.find_or_initialize_by(user_id: user.id)
      user_image.image_urls = user_image_params[:image_urls] 
      
      if user_image.save
        render json: { message: "Image URLs updated successfully." }, status: :ok
      else
        render json: { error: user_image.errors.full_messages.join(", ") }, status: :unprocessable_entity
      end
    end
  
    private
  
    def user_image_params
      params.require(:user_image).permit(:user_id, image_urls: {}) 
    end
  end