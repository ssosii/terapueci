Wymagania:
- php7.4
- globalna instalacja Symfony linux: https://symfony.com/download , windows: www.osradar.com/how-to-install-symfony-on-windows-10/
- composer w wersji 2: https://getcomposer.org/download/


Wszystkie operacje wykonujemy w głównym katalogu z aplikacją.

1. git clone https://github.com/maciejfiglarz/lubella.git
2. utworzenie pliku env.local z zawartością:
APP_ENV=dev
DATABASE_URL=mysql://newuser:password@localhost:3306/lubella

W powyższym kodzie należy podmienić zmienne:

newuser: użytkownik którym logujemy się do phpmyadmin
password: hasło dla użytkownika 
lubella: nazwa bazy danych wcześniej utworzona w phpmyadmin


3. instalacja: 
    - composer i
    - npm i

4. odświeżenie schematu bazy danych bazy: 
 - php bin/console make:migration
 - php bin/console doctrine:migrations:migrate

 5. wgranie danych testowych
 - php bin/console doctrine:fixtures:load

 6. Uruchumienie aplikacji - w katalogu głownym:
    - symfony server:start
    - npm run dev-server
