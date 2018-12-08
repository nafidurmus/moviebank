Rails.application.routes.draw do
  
	namespace :api do
		namespace :v1 do
		  resources :users  , param: :username
		  resources :ratings
		  resources :comments
		  resources :watchlists
		  resources :watchlaters
		  
		  post '/auth/login', to: 'authentication#login'
		  #get '/auth/logout', to: 'authentication#logout'
		  #delete 'auth/logout',  to: 'authentication#logout'
		end
	end



end
