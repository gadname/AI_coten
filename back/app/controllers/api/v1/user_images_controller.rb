class Api::V1::UserImagesController < ApplicationController
  before_action :set_current_user, only: [:create, show, update_urls]

  def create
    user_image = UserImage.find_or_initialize_by(user_id: user_image_params[:user_id])
    user_image.image_urls = user_image_params[:image_urls] # 修正: :image_url -> :image_urls
    
    if user_image.save
      render json: { message: "Image uploaded successfully." }, status: :created
    else
      render json: { error: "Failed to upload image." }, status: :unprocessable_entity
    end # 追加: end キーワード
  end

  def show
    user_image = UserImage.find(params[:id])
    if user_image
      render json: user_image, status: :ok
    else
      render json: { error: "UserImage not found." }, status: :not_found
    end
  end

  def index
    # current_userを使用して、認証されたユーザーのUserImageを取得
    if params[:user_id]
      user = User.find(uid: params[:user_id])
      user_images = user.user_images
    elsif @current_user
      user_images = @current_user.user_images
    end

    if user_images.any?
      render json: user_images.last.image_urls, status: :ok
    else
      render json: {}, status: :not_found
    end
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