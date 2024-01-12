require 'net/http'
require 'uri'
require 'json'

class ApplicationController < ActionController::API
  include ActionController::Cookies

  private

  def set_current_user
    Rails.logger.info "Current session: #{session.inspect}"  # セッション情報をログに出力
    

    if session[:user_id] && session[:access_token] == received_access_token
      # セッションからユーザー情報を取得
      @current_user = User.find_by(id: session[:user_id])
    else
      # Google APIからユーザー情報を取得
      session.delete(:user_id)
      session.delete(:access_token)
      user_info = fetch_user_info_from_google(received_access_token)

      # Googleのuidをもとにユーザー検索
      @current_user = User.find_or_initialize_by(uid: user_info['sub'])

      if @current_user.new_record?
        # ユーザーがデータベースに存在しない場合は、新規作成する
        @current_user.name = user_info['name']
        @current_user.email = user_info['email']
        @current_user.save
      end

      def current_user
        @current_user ||= User.find(session[:user_id]) if session[:user_id]
      end

      # セッションにユーザー情報を保存
      session[:user_id] = @current_user.id
      session[:access_token] = received_access_token
    end
  end

  # Googleのユーザー情報を取得
  def fetch_user_info_from_google(access_token)
    uri = URI.parse("https://www.googleapis.com/oauth2/v3/userinfo")
    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = "Bearer #{access_token}"

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
      http.request(request)
    end

    JSON.parse(response.body)
  end
end
