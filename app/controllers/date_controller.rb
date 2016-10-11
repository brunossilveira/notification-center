class DateController < ApplicationController
  def index
    now = Time.now

    @time = now.strftime('%H:%M')
    @week_day = now.strftime('%A')
    @month_day = now.strftime('%B, %e')
  end
end
