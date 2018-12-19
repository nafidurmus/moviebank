Rails.application.routes.draw do
  
	namespace :api do
		namespace :v1 do
		  resources :users  , param: :username
		  resources :ratings
		  resources :comments
		  resources :watchlists
		  resources :watchlaters
		  
		  post '/auth/login', to: 'authentication#login'
		  #put '/auth/forget_password/:username', to: 'authentication#forget_password'
		  #delete 'auth/logout',  to: 'authentication#logout'
		  post 'password/get_token', to: 'passwords#getting_token' #get_token 
      	  post 'password/reset', to: 'passwords#password_reset' #reset password
		end
	end



end
