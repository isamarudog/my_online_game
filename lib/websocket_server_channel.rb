
# 参考：http://shokai.org/blog/archives/5434

require 'rubygems'
require 'em-websocket'
require 'json'

EM::run do
  puts 'server start'
  @channel = EM::Channel.new

  EM::WebSocket.start(:host => "0.0.0.0", :port => 8080) do |ws|
    ws.onopen{
      sid = @channel.subscribe{|message_txt|
        begin
          @message = JSON.parse(message_txt)

        rescue
          ws.send(message_txt)

        else
          if @message['cookie'] then
            ws.send('message[\'cookie\]:' + @message['cookie']) #'userA'
          end
  
          if @message['channel'] then
            ws.send('message[\'channel\']:' + @message['channel']) #'test_map'
          end
  
          if @message['event'] then
            ws.send('message.event:' + @message.event) #'user_move'
          end
  
          if @message['data'] then
            ws.send('message.data:' + @message.data) #{'user_name':'userA', 'x':0, 'y':3}
          end

        ensure

        end
      }

      # server console log
      puts "<#{sid}> connected!!"

      # message to client
      @channel.push("hello <#{sid}>")

      # channel登録時のidを使うためにonopen内で他のイベント登録を済ませる
      ws.onmessage{|mes|
        puts "<#{sid}> #{mes}"
        @channel.push("#{mes}")
      }

      ws.onclose{
        puts "<#{sid}> disconnected"
        @channel.unsubscribe(sid)
        @channel.push("<#{sid}> disconnected")
      }
    }
  end
end
