# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do

  devise_for :users
	root to:'home#index'
	get '/flow' => 'home#flow'

	resources :months
	resources :incomes
	resources :savings
	resources :debts
	resources :spendings

end
