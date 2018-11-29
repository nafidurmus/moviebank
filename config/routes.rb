Rails.application.routes.draw do
  
	namespace :api do
		namespace :v1 do
		  resources :users  , param: :username
		  resources :ratings
		  
		  post '/auth/login', to: 'authentication#login'
		end
	end



end
