require 'test_helper'

class WatchlistsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @watchlist = watchlists(:one)
  end

  test "should get index" do
    get watchlists_url, as: :json
    assert_response :success
  end

  test "should create watchlist" do
    assert_difference('Watchlist.count') do
      post watchlists_url, params: { watchlist: { user_id: @watchlist.user_id, watchlist_movie_id: @watchlist.watchlist_movie_id } }, as: :json
    end

    assert_response 201
  end

  test "should show watchlist" do
    get watchlist_url(@watchlist), as: :json
    assert_response :success
  end

  test "should update watchlist" do
    patch watchlist_url(@watchlist), params: { watchlist: { user_id: @watchlist.user_id, watchlist_movie_id: @watchlist.watchlist_movie_id } }, as: :json
    assert_response 200
  end

  test "should destroy watchlist" do
    assert_difference('Watchlist.count', -1) do
      delete watchlist_url(@watchlist), as: :json
    end

    assert_response 204
  end
end
