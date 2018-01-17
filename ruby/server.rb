#!/usr/local/Ruby/bin/ruby

require 'cgi'
require 'csv'
require 'json'
load './process.rb'

print "Content-Type: text/plain;charset=utf-8\n\n"

begin
  cgi = CGI.new
  # キーをSymbolに変更
  # cgiをハッシュに変換する
  parameter = cgi.params.map { |key, value| [key.to_sym, value.first] }.to_h

  result = case parameter[:cmd]
           when 'check_account'
             check_account(parameter)
           when 'append_task'
             start_task(parameter)
           else
             { ok: false, data: { message: 'そんなコマンド無いよ' } }
  end

  print JSON.generate(result)
rescue StandardError => e
  # errorの時は、エラー内容と実際のcgiを返す
  response = {
    ok: false,
    data: e.inspect.to_s,
    path: e.backtrace.join("\n"),
    input: parameter
  }
  print JSON.generate(response)
end
