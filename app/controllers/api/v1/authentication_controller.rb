module Api::V1
  class AuthenticationController < ApplicationController
    before_action :authorize_request, except: :login
    require 'jwt'

    # POST /auth/login
    def login
      @user = User.find_by_email(params[:email])
      if @user&.authenticate(params[:password])
        token = JsonWebToken.encode(id: @user.id)
        time = Time.now #+ 24.hours.to_i
        render json: { token: token, last_login_time: time.strftime("%m-%d-%Y %H:%M"),
                       username: @user.username, firstname: @user.firstname }, status: :ok
        

      else
        render json: { error: 'Login Unsuccessfull(Invalid username / password)' }, status: :unauthorized
      end
    end

    def logout
      #frontend ile yapılabilir.
    end

    private

    def login_params
      params.permit(:email, :password)
    end
  end
end

