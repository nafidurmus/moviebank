class CreateWatchlaters < ActiveRecord::Migration[5.2]
  def change
    create_table :watchlaters do |t|
      t.bigint :user_id
      t.string :watchlater_movie_id

      t.timestamps
    end
  end
end
