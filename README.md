# Moviebank

- Movie Bank aracılığı ile kullanıcıların filmler, diziler ve ünlüler hakkında bilgi edinebileceği, izleyeceği filmleri sitemizde bulunan popüler filmler listesi, gelecek filmler listesi, filmlere yapılan yorumlar ve filmlere verilen puanlar sayesinde seçebileceği, filmlere puan verip yorum yapabileceği kullanıcı etkileşimli bir web site.

## Getting Started

- Fork and clone this repo

### Prerequisites

- Ruby on Rails nasıl kurulur ? 

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

- React nasıl kurulur ? 

```
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
$ sudo apt-get install -y nodejs

$ sudo apt-get install npm

```


## Projeyi çalıştırmak için aşağıdaki kodları sırayla çalıştıralım.

```
// api yi çalıştırmak için 

$ git clone this repo
$ cd repo_name
$ bundle install // kütüphaneler için gerekli
$ rails db:create // database oluşturma
$ rails db:migrate // database ayarları
$ rails s -p 3001

// client i çalıştırmak için

$cd MovieBank_Client
$npm install
$npm start #facebook ve google girişini kullanma isterseniz HTTPS=true npm start


```


## Built With

* [Ruby on Rails](https://rubyonrails.org) - Web framework 
* [Postgresql](https://www.postgresql.org/) - Database
* [React](https://reactjs.org/) - Client



## Contributing

* **[Erim Tuzcuoglu](https://github.com/ErimTuzcuoglu)**  
* **[Sefa Emrahoglu](https://github.com/sefaemrahoglu)** 



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


------------------------------------

