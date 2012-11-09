class PrototypeController < ApplicationController

  # Pusherのチャットサンプル
  def pusher_chat
  end

  def pusher_chat_push
    Pusher["test_channel"].trigger("test_event", params[:text]+"<br />")
  end

  # テストマップ
  def test_map
  end

end
