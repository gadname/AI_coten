Rails.application.routes.draw do
  post 'auth/:provider/callback', to: 'api/v1/users#create'
  delete 'users/:email', to: 'api/v1/users#destroy', constraints: { email: %r{[^/]+} }
  
  namespace :api do
    namespace :v1 do
      resources :posts do
        get 'user_posts', on: :collection # これにより /api/v1/posts/user_posts が利用可能になります
      end
    end
  end
end