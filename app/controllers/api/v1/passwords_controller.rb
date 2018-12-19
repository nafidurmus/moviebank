module Api::V1
	class PasswordsController < ApplicationController
		def getting_token
	        if params[:email].blank?
	            return render json: {
	                status: 'FAIL', results: nil, error: "email not present"
	            }
	        end

	        @user = User.find_by(email: params[:email])

	        if @user.present?
	            #send email here
	            @user.generate_password_token!
	            UserMailer.getting_token(@user).deliver_now
	            render json: { message: "email has been send"}, status: :ok
	        else
	            render json: {
	                status: 'FAIL', results: nil, error: "User not found"
	            }, status: :not_found
	        end
	    end

	    def password_reset
	        token = params[:token].to_s
	        if params[:email].blank?
	            return render json: {
	                error: "token not present"
	            }
	        end

	        user = User.find_by(reset_password_token: token)

	        if user.present? && user.password_token_valid?
	            if user.reset_password!(params[:password])
	                render json: {
	                    status: 'OK'
	                }, status: :ok
	            else
	                render json: {
	                    status: user.errors.full_messages
	                }
	            end
	        else
	            render json: {
	                error: ['link not valid or expired. try generating new link']
	            }, status: :not_found
	        end
	    end

	
	end

end