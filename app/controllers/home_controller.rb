class HomeController < ApplicationController
  def index
    @forecast_url = url_for(only_path: false, controller: 'forecast')
    @coordinates = { latitude: '-27.5800', longitude: '-48.6300' }
  end
end
