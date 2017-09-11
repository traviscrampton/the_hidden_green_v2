source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


gem 'rails', '~> 5.0.5'
gem 'responders'
gem 'devise'
gem 'sqlite3'
gem "awesome_print", require: "ap"
gem 'puma', '~> 3.0'
gem "react-rails"
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.2'
gem 'jquery-rails'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
group :development, :test do
  gem "pry"
  gem "pry-rails"
  gem "pry-nav"
	gem 'listen', '~> 3.0.5'
end

group :test do
  gem "factory_girl_rails"
  gem "rspec-rails", "~> 3.0"
	gem 'sqlite3'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

group :production do
  gem 'pg'
end
