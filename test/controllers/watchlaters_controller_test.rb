require 'test_helper'

class WatchlatersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @watchlater = watchlaters(:one)
  end

  test "should get index" do
    get watchlaters_url, as: :json
    assert_response :success
  end

  test "should create watchlater" do
    assert_difference('Watchlater.count') do
      post watchlaters_url, params: { watchlater: { user_id: @watchlater.user_id, watchlater_movie_id: @watchlater.watchlater_movie_id } }, as: :json
    end

    assert_response 201
  end

  test "should show watchlater" do
    get watchlater_url(@watchlater), as: :json
    assert_response :success
  end

  test "should update watchlater" do
    patch watchlater_url(@watchlater), params: { watchlater: { user_id: @watchlater.user_id, watchlater_movie_id: @watchlater.watchlater_movie_id } }, as: :json
    assert_response 200
  end

  test "should destroy watchlater" do
    assert_difference('Watchlater.count', -1) do
      delete watchlater_url(@watchlater), as: :json
    end

    assert_response 204
  end
end
