require 'test_helper'

class RatingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @rating = ratings(:one)
  end

  test "should get index" do
    get ratings_url, as: :json
    assert_response :success
  end

  test "should create rating" do
    assert_difference('Rating.count') do
      post ratings_url, params: { rating: { rating_movie_id: @rating.rating_movie_id, rating_value: @rating.rating_value, user_id: @rating.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show rating" do
    get rating_url(@rating), as: :json
    assert_response :success
  end

  test "should update rating" do
    patch rating_url(@rating), params: { rating: { rating_movie_id: @rating.rating_movie_id, rating_value: @rating.rating_value, user_id: @rating.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy rating" do
    assert_difference('Rating.count', -1) do
      delete rating_url(@rating), as: :json
    end

    assert_response 204
  end
end
