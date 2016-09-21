Rails.application.routes.draw do
  root 'home#index'

  get 'forecast', to: 'forecast#index'
end
