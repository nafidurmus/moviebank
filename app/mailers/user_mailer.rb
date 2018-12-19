class UserMailer < ApplicationMailer

    def welcome_email(user)
        @user = user
        mail(to: @user.email, subject: 'Welcome to my awesome site')
    end

    def getting_token(user)
        @user = user
        mail(to: @user.email, subject: "Forget Password  #{@user.username}")
    end
end