# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# chat-space DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|index: true <br> null: false|
### Association
- has_many  :groups, throught:   :groups_users
- has_many  :groups_users
- has_many  :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many  :users, throught:    :groups_users
- has_many  :groups_users
- has_many  :messages

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false <br> foreign_key: true|
|group_id|references|null: false <br> foreign_key: true|
### Association
- belongs_to  :group
- belongs_to  :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|message|text|null: false|
|image|text|null: false|
### Association
- has_many  :groups
- has_many  :users