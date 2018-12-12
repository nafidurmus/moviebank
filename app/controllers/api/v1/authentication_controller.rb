module Api::V1
  class AuthenticationController < ApplicationController
    before_action :authorize_request, except: :login
    #require 'jwt'

    # POST /auth/login
    def login
      @user = User.find_by_username(params[:username])
      if @user&.authenticate(params[:password])
        token = JsonWebToken.encode(id: @user.id)
        time = Time.now #+ 24.hours.to_i
        render json: { token: token, last_login_time: time.strftime("%m-%d-%Y %H:%M"),
                       user: @user}, status: :ok
                       # comment: @user.comment şu şekilde diğerleride çağrılabilir.
      else
        render json: { error: 'Login Unsuccessfull(Invalid username / password)' }, status: :unauthorized
      end
    end

    def logout
      #frontend ile yapılabilir.
      #logout
      #redirect_to root_url

      #session = JsonWebToken::Session.new(payload: payload)
      #session.flush_by_access_payload
      #render json: :ok
    end

    private

    def login_params
      params.require(:user).permit(:email, :password)
    end
  end
end

