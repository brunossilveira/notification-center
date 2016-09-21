class ForecastController < ApplicationController
  def index
    @forecast = ForecastIO.forecast(params[:latitude], params[:longitude])

    render json: @forecast.to_json
  end
end
