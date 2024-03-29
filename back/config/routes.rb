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
        resources :our_images do
          collection do
            post 'update_urls' 
          end
        end 
      end
    end
  end
end