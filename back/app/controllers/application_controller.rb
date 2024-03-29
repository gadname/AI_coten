require 'net/http'
require 'uri'
require 'json'

class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format.json? }
  
  
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def set_current_user
    received_access_token = request.headers["Authorization"].split(' ').last
    
    # Rails.logger.info "User ID in session: #{session[:user_id]}"
    # Rails.logger.info "Received access token: #{received_access_token}"

    if session[:user_id] && session[:access_token] == received_access_token
      @current_user = User.find_by(id: session[:user_id])
    else
      session.delete(:access_token)
      user_info = fetch_user_info_from_google(received_access_token)
      @current_user = User.find_by(uid: user_info['sub']) 

      session[:user_id] = @current_user.id
      session[:access_token] = received_access_token
    end
    Rails.logger.info "@current_user: #{@current_user.inspect}"
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
