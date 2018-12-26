# Moviebank

- Movie Bank aracılığı ile kullanıcıların filmler, diziler ve ünlüler hakkında bilgi edinebileceği, izleyeceği filmleri sitemizde bulunan popüler filmler listesi, gelecek filmler listesi, filmlere yapılan yorumlar ve filmlere verilen puanlar sayesinde seçebileceği, filmlere puan verip yorum yapabileceği kullanıcı etkileşimli bir web site.

- Client ile ilgili bölümler için detaylı bilgi: [Moviebank Client](https://github.com/ErimTuzcuoglu/MovieBank)


### Hazırlıklar

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
$ [nodejs.org](https://nodejs.org/en/download/) üzerinden işletim sisteminize uygun nodejs sürümünü yükleyin.
$ React.Js kurulumunu güncel olarak [Reactjs.org](https://reactjs.org/tutorial/tutorial.html#setup-for-the-tutorial) üzerinden bulabilirsiniz.

$ sudo apt-get install npm // npm i indirmek için

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


- Bu proje MIT lisansıyla lisanslanmıştır.[LICENSE](https://github.com/nafidurmus/moviebank/blob/master/LICENSE)
------------------------------------

