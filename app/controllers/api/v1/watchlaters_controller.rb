module Api::V1
	class WatchlatersController < ApplicationController
	  before_action :set_watchlater, only: [:show, :update, :destroy]

	  # GET /watchlaters
	  def index
	    @watchlaters = Watchlater.all

	    render json: @watchlaters
	  end

	  # GET /watchlaters/1
	  def show
	    render json: @watchlater
	  end

	  # POST /watchlaters
	  def create
	    @watchlater = Watchlater.new(watchlater_params)

	    if @watchlater.save
	      render json: @watchlater, status: :created
	    else
	      render json: { errors: @watchlater.errors.full_messages },
               status: :unprocessable_entity
	    end
	  end

	  # PATCH/PUT /watchlaters/1
	  def update
	    if @watchlater.update(watchlater_params)
	      render json: @watchlater
	    else
	      render json: @watchlater.errors, status: :unprocessable_entity
	    end
	  end

	  # DELETE /watchlaters/1
	  def destroy
	    @watchlater.destroy
	    render json: {notice: 'Movie was successfully destroyed for your list'}
	  end

	  private
	    # Use callbacks to share common setup or constraints between actions.
	    def set_watchlater
	      @watchlater = Watchlater.find(params[:id])
	    end

	    # Only allow a trusted parameter "white list" through.
	    def watchlater_params
	      params.permit(:user_id, :watchlater_movie_id)
	    end
	end

end