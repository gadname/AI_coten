Rails.application.routes.draw do
  post 'auth/:provider/callback', to: 'api/v1/users#create'
  delete 'users/:email', to: 'api/v1/users#destroy', constraints: { email: %r{[^/]+} }
  
  namespace :api do
    namespace :v1 do
      resources :posts 
      resources :user_images do
        collection do
          post 'update_urls' 
          get 'share'
        end
      end
    end
  end

  # 直接アクセス可能にするためのルート
  get 'user_images', to: redirect('/api/v1/user_images')
  get 'user_images/share', to: redirect('/api/v1/user_images/share')
  post 'user_images/update_urls', to: redirect('/api/v1/user_images/update_urls')
end