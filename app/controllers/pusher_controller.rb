class PusherController < ApplicationController
  def index
  end

  def create
    Pusher["channel"].trigger("test_event", params[:text]+"<br />")
  end
end
