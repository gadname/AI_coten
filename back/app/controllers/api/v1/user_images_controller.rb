class Api::V1::UserImagesController < ApplicationController
  # POST /api/v1/user_images
  def create
    user_image = UserImage.find_or_initialize_by(user_id: user_image_params[:user_id])
    user_image.image_urls = user_image_params[:image_url]
    
    if user_image.save
      render json: { message: "Image uploaded successfully." }, status: :created
    else
      # 直接文字列でエラーメッセージを指定
      render json: { error: "Failed to upload image." }, status: :unprocessable_entity
  end
end

def update_urls
  user = User.find_by(id: params[:user_id])
  unless user
    render json: { error: "User does not exist." }, status: :not_found
    return
  end

  user_image = UserImage.find_or_initialize_by(user_id: user.id)
  user_image.image_urls = params[:image_urls]
  
  if user_image.save
    render json: { message: "Image URLs updated successfully." }, status: :ok
  else
    render json: { error: user_image.errors.full_messages.join(", ") }, status: :unprocessable_entity
  end
end

  def index
    user_images = UserImage.where(user_id: params[:user_id])
    render json: user_images
  end

  private

  def user_image_params
    params.permit(:user_id, image_urls)
  end
end