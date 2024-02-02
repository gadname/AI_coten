Rails.application.routes.draw do
  post 'auth/:provider/callback', to: 'api/v1/users#create'
  delete 'users/:email', to: 'api/v1/users#destroy', constraints: { email: %r{[^/]+} }
  
  namespace :api do
    namespace :v1 do
      resources :posts 
      resources :user_images do
        collection do
          post 'update_urls' # user_imagesコントローラーのupdate_urlsアクションに対応するルートを追加
        end
      end
    end
  end
end