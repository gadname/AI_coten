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
    @post = @current_user.posts.build(post_params)
    if @post.save  
      render json: { post: @post, image_url: @post.image.url }, status: :created 
    else
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
    params.require(:post).permit(:image)
  end
end