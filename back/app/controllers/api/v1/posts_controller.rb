class Api::V1::PostsController < ApplicationController
  before_action :set_current_user, only: [:create, :update, :destroy] # ユーザー認証が必要なアクションに追加

  def index
    binding.pry
    if current_user

      @posts = current_user.posts
      
      render json: @posts
    else
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
  end
  
    def show
      @post = Post.find(params[:id])
      render json: @post
    end
  
    def create
      # @current_userが設定されていることを確認
      if @current_user
        # 新しい投稿を@current_userに関連付けて初期化
        @post = @current_user.posts.build(post_params)
        @post.user_id = @current_user.id
  
        if @post.save
          # 投稿が正常に保存された場合は、投稿をJSON形式で返す
          render json: @post, status: :created
        else
          # 保存に失敗した場合は、エラーをJSON形式で返す
          render json: @post.errors, status: :unprocessable_entity
        end
      else
        # @current_userが設定されていない場合は、認証エラーを返す
        render json: { error: 'Unauthorized' }, status: :unauthorized
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
      params.require(:post).permit(:title, :content,  :image, :image_cache, :user_id)
    end
  
  end