module Api::V1 
	class WatchlistsController < ApplicationController
	  before_action :set_watchlist, only: [:show, :update, :destroy]

	  # GET /watchlists
	  def index
	    @watchlists = Watchlist.all

	    render json: @watchlists
	  end

	  # GET /watchlists/1
	  def show
	    render json: @watchlist
	  end

	  # POST /watchlists
	  def create
	    @watchlist = Watchlist.new(watchlist_params)

	    if @watchlist.save
	      render json: @watchlist, status: :created
	    else
	      render json: { errors: @watchlist.errors.full_messages },
               status: :unprocessable_entity
	    end
	  end

	  # PATCH/PUT /watchlists/1
	  def update
	    if @watchlist.update(watchlist_params)
	      render json: @watchlist
	    else
	      render json: @watchlist.errors, status: :unprocessable_entity
	    end
	  end

	  # DELETE /watchlists/1
	  def destroy
	    @watchlist.destroy
	    render json: {notice: 'Movie was successfully destroyed for your list'}
	  end

	  private
	    # Use callbacks to share common setup or constraints between actions.
	    def set_watchlist
	      @watchlist = Watchlist.find(params[:id])
	    end

	    # Only allow a trusted parameter "white list" through.
	    def watchlist_params
	      params.permit(:user_id, :watchlist_movie_id)
	    end
	end

end