# Moviebank api dökümantasyonu

# Giriş

- Bu dökümantasyonda Ruby on Rails ile yazılmış Moviebank apisi vardır. Api Kullanıcı kaydı, kullanıcı girişi , yorum yapma , puan verme , izledikleri film listesini  oluşturma ve izlemek istedikleri film listesini oluşturma üzere 6 farklı işlemi yapmaktadır.

## *Kullanılan teknolojiler*

* [Ruby on Rails](https://rubyonrails.org) - Web framework 
* [Postgresql](https://www.postgresql.org/) - Database
* [Jwt](https://jwt.io/) - JSON Web Tokens

# Kurulum


- *Ruby on Rails linux (debian tabanlı) kurulumu*

```
$ sudo apt-get update //sistemi güncelleyelim 

$ sudo apt-get install curl // rvm yüklemek için curl kuralım

$ \curl -L https://get.rvm.io | bash -s stable --ruby // curl i indirelim
// rvm i yükledikten sonra aşağıdaki kodları sırayla çalıştıralım.

$ rvm get stable --autolibs=enable
$ rvm install ruby
$ rvm --default use ruby-2.5.1
 
$ sudo apt-get install nodejs //nodejs i indirelim

$ gem -v // 2.5.1

$ gem install rails --version=5.2.1

$ rails -v => 5.2.1

$ sudo apt-get install postgresql // database i indirmek için

```

-  *Ruby on Rails Windows / Mac  kurulumu*

- [Siteden](http://railsinstaller.org/en) uygun olan versiyonu indirebilirsiniz.
- [Postgresql](https://www.postgresql.org/download/) size uygun olan versiyonu indirebilirsiniz.


# Çalıştırmak için

Aşağıdaki kodları sırayla çalıştıralım.

```

$ git clone this repo
$ cd repo_name
$ bundle install // kütüphaneler için gerekli
$ rails db:create // database oluşturma
$ rails db:migrate // database ayarları
$ rails s -p 3001

```

## Kullanıcı(user)

- Kullanıcı(user) kaydı

```http
POST localhost:3001/api/v1/users
```

#### Data

| name              		| type   | notes       	            |
| :---------------- 		| :----- | :----------------------- |
| firstname              	| string | **gerekli**              |
| lastname				 	| string | **gerekli**  			|
| username     				| string | **gerekli(uniq)**   		|
| email     				| string | **gerekli(uniq)**   		|
| password     				| string | **gerekli(min 6 )**    	|
| password_confirmation     | string | **gerekli(min 6 )**    	|

#### Cevap dönüşü

    /localhost:3001/api/v1/users

    json {
    "id": 6,
    "firstname": "nafi",
    "lastname": "durmus",
    "username": "nafidurmus07",
    "email": "nafidurmus07@gmail.com",
    "password_digest": "$2a$10$8POpCuhEPDQtXdnO7rjpneSjbuTUOchEsWBqsYultxNQVZ.kXvow6",
    "rating": [],
    "comment": [],
    "watchlist": [],
    "watchlater": [] }

- Bütün kullanucularu görüntüleme

```http
GET localhost:3001/api/v1/users
```

#### Cevap dönüşü

    /localhost:3001/api/v1/users

    json {
    [
    {
        "id": 4,
        "firstname": "erim",
        "lastname": "tuzcu",
        "username": "ert",
        "email": "sdjsakhd@gmail.com",
        "password_digest": "$2a$10$95lPuxyJx5WzOjGdm.DSdec5rNk6xDhHIO2ckQ9aR/YC0ItorP19W",
        "rating": [],
        "comment": [],
        "watchlist": [],
        "watchlater": []
    },
    {
        "id": 5,
        "firstname": "sefa",
        "lastname": "Emrahoglu",
        "username": "seraemtah",
        "email": "seraemtah@gmail.com",
        "password_digest": "$2a$10$y4Kw2.UszcCyYFW4kPsWUe0bv/hJSLppfVZb4MuI/IcbaED806u7u",
        "rating": [],
        "comment": [],
        "watchlist": [],
        "watchlater": []
    }
    ] }

 - Tek kullanıcıyı görüntüleme

```http
GET localhost:3001/api/v1/users/usernname
```

#### Cevap dönüşü

    /localhost:3001/api/v1/users/username

    json {
    "id": 4,
    "firstname": "erim",
    "lastname": "tuzcu",
    "username": "ert",
    "email": "sdjsakhd@gmail.com",
    "password_digest": "$2a$10$95lPuxyJx5WzOjGdm.DSdec5rNk6xDhHIO2ckQ9aR/YC0ItorP19W",
    "rating": [],
    "comment": [],
    "watchlist": [],
    "watchlater": []}

 - Kullanıcıyı Silme


```http
DELETE localhost:3001/api/v1/users/usernname
```

#### Cevap dönüşü

    /localhost:3001/api/v1/users/username

    json {
    	"notice": "User was successfully destroyed"
    }

 - Kullanıcıyı Güncelleme

```http
PUT/PATCH localhost:3001/api/v1/users/usernname
```

#### Cevap dönüşü

    /localhost:3001/api/v1/users/username

    json {
    "id": 6,
    "firstname": "nafi(güncellendi)",
    "lastname": "durmus",
    "username": "nafidurmus07",
    "email": "nafidurmus07@gmail.com",
    "password_digest": "$2a$10$qntpbXbVF99SygXse.4YQ.ge7BdZrQ4hYF8xG/35HR98HfM4XGb3e",
    "rating": [],
    "comment": [],
    "watchlist": [],
    "watchlater": []
    }

## Kullanıcı giriş(User login)

```http
POST localhost:3001/api/v1/auth/login/usernname
```

#### Cevap dönüşü

	json {
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NiwiZXhwIjoxNTQ0NzA1OTUwfQ.FL3rVVMQuT22wT1xBbEW5udu-xcb6jmS6b7ZWktJ23g",
    "last_login_time": "12-12-2018 15:59",
    "user": {
        "id": 6,
        "firstname": "nafi(güncellendi)",
        "lastname": "durmus",
        "username": "nafidurmus07",
        "email": "nafidurmus07@gmail.com",
        "password_digest": "$2a$10$qntpbXbVF99SygXse.4YQ.ge7BdZrQ4hYF8xG/35HR98HfM4XGb3e",
        "created_at": "2018-12-12T12:30:07.099Z",
        "updated_at": "2018-12-12T12:47:02.317Z",
        "reset_password_token": null,
        "reset_password_sent_at": null
    }}

## Yorum(commment)

- Yorum oluşturma

```http
POST localhost:3001/api/v1/comments
```

#### Data

| name              	| type   | notes       	            |
| :---------------- 	| :----- | :----------------------- |
| user_id              	| bigint | **gerekli**              |
| comment_title			| string | **gerekli**  			|
| comment_body     		| text 	 | **gerekli**   			|
| comment_movie_id     	| string | **gerekli**   			|

- Yorumları gösterme

```http
GET localhost:3001/api/v1/comments
```


```http
GET localhost:3001/api/v1/comments/id
```

- Yorumu silme

```http
DELETE localhost:3001/api/v1/comments/id
```

- Yorumu güncelleme

```http
PUT/PATCH localhost:3001/api/v1/comments/id
```


## Puan(rating)

- Puan oluşturma

```http
POST localhost:3001/api/v1/ratings
```

#### Data

| name              	| type   | notes       	            |
| :---------------- 	| :----- | :----------------------- |
| user_id              	| bigint | **gerekli**              |
| rating_value			| float  | **gerekli**  			|
| rating_movie_id     	| string | **gerekli**   			|

- Puanları gösterme

```http
GET localhost:3001/api/v1/ratings
```


```http
GET localhost:3001/api/v1/ratings/id
```

- Puanı silme

```http
DELETE localhost:3001/api/v1/ratings/id
```

- Puanı güncelleme

```http
PUT/PATCH localhost:3001/api/v1/ratings/id
```


## Sonra izle listesi(watchlater)

- Sonra izle listesini oluşturma

```http
POST localhost:3001/api/v1/watchlaters
```

#### Data

| name              	| type   | notes       	            |
| :---------------- 	| :----- | :----------------------- |
| user_id              	| bigint | **gerekli**              |
| watchlater_movie_id	| string  | **gerekli**  			|

- Sonra izle listesini gösterme

```http
GET localhost:3001/api/v1/watchlaters
```


```http
GET localhost:3001/api/v1/watchlaters/id
```

- Sonra izle listesindekini silme

```http
DELETE localhost:3001/api/v1/watchlaters/id
```

- Sonra izle listesini güncelleme ## bunu koymayalım :D

```http
PUT/PATCH localhost:3001/api/v1/watchlaters/id
```


## İzlediklerim listesi(watchlist)

- İzlenen filmler listesini ekleme 

```http
POST localhost:3001/api/v1/watchlist
```

#### Data

| name              	| type   | notes       	            |
| :---------------- 	| :----- | :----------------------- |
| user_id              	| bigint | **gerekli**              |
| watchlist_movie_id	| string  | **gerekli**  			|

- İzlenen listesini gösterme

```http
GET localhost:3001/api/v1/watchlist
```


```http
GET localhost:3001/api/v1/watchlist/id
```

- Sonra izle listesindekini silme

```http
DELETE localhost:3001/api/v1/watchlist/id
```

- Sonra izle listesini güncelleme ## burada da olabilir koymayalım :D

```http
PUT/PATCH localhost:3001/api/v1/watchlist/id
```


-> Burada **comment(yorum)** , **rating(puan)** , **watchlater(izlenecek filmler listesi)** ve **watchlist(izlenen filmeler listesi)** GET sorgusu uygulayabildiğimiz gibi direk **user(kullanıcı)** altında da döndüre biliyoruz.

-> Buradan istek ve yanıt görevinde **JSON** formatı desteklenmektedir.

-> Login(giriş) yaptığımızda çekeceğiz verileri atarlayabiliriz.

```
 def login
      @user = User.find_by_username(params[:username])
      if @user&.authenticate(params[:password])
        token = JsonWebToken.encode(id: @user.id)
        time = Time.now #+ 24.hours.to_i
        render json: { token: token, last_login_time: time.strftime("%m-%d-%Y %H:%M"),
                       user: @user}, status: :ok
                    ->   # comment: @user.comment şu şekilde diğerleride çağrılabilir. <-
      else
        render json: { error: 'Login Unsuccessfull(Invalid username / password)' }, status: :unauthorized
      end
    end

    ```