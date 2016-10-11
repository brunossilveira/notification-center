Rails.application.routes.draw do
  root 'home#index'

  get 'forecast', to: 'forecast#index'

  resources :date, only: [:index]
end
