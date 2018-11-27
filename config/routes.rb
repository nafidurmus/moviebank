Rails.application.routes.draw do
	namespace :api do
		namespace :v1 do

		  resources :users, param: :username
		  post '/auth/login', to: 'authentication#login'
		  #post '/auth/facebook_login', to: 'authentication#facebook_login'
		end
	end
end
