Rails.application.routes.draw do
  post 'auth/:provider/callback', to: 'api/v1/users#create'
  delete 'users/:email', to: 'api/v1/users#destroy', constraints: { email: %r{[^/]+} }
  
  namespace :api do
    namespace :v1 do
      resources :posts do
        
      end
    end
  end
end