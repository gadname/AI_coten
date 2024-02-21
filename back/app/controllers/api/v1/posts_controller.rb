class Api::V1::PostsController < ApplicationController
  before_action :set_current_user

  def index
    @posts = @current_user.posts
    render json: @posts.map { |post| { id: post.id, url: post.image.url } }
  end

  def show
    @post = Post.find(params[:id])
    render json: @post
  end


  


  def create 
    @post = @current_user.posts.build(post_params) #新しいpostオブジェクトを作成
    if @post.save
      logger.debug "Image URL: #{@post.image.url}"
      # 新しい画像のURLのみを含むJSONを返す
      render json: { url: @post.image.url }, status: :created #クライアントにjsonオブジェクトでimage属性のurlを返している
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
    params.require(:post).permit(:image, :user_id)
  end
end