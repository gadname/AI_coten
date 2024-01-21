class Api::V1::PostsController < ApplicationController
  before_action :set_current_user

  def index
    if @current_user
      @posts = @current_user.posts
      render json: @posts
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  def create
    # Rails.logger.info "Received params: #{params.inspect}"
    # Rails.logger.info "@current_user: #{@current_user.inspect}"
    @post = @current_user.posts.build(post_params)
    if @post.save
      Rails.logger.info "Post saved successfully: #{@post.inspect}"
      render json: { post: @post, image_url: @post.image.url }, status: :created 
    else
      Rails.logger.info "Failed to save post: #{@post.errors.full_messages}"
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end 

  def edit 
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
  end


  private

  def post_params
    params.require(:post).permit(:title, :content, :image, :image_cache, )
  end
end