# encoding: utf-8

require 'csv'

users = %w[b1013223 b1015076 b1015141 b1015172 b1015179 b1015209]
tasks = %w[オブジェクト指向プログラミング クラス インスタンス クラス変数 インスタンス変数 継承（インヘリタンス） メソッド LAN INTERNET ルーター ソケット サーバとクライアント IPアドレス ポート番号 DHCP DNS]
headers = CSV.read('./list/plans.csv').first.map(&:to_sym)

CSV.open('./list/plans.csv', 'w', encoding: 'UTF-8', headers: true) do |csv|
  plan_id = 0
  users.each do |user_id|
    tasks.each do |task|
      row = CSV::Row.new(headers, [])
      row[:plan_id] = plan_id += 1
      row[:user_id] = user_id
      row[:task] = task

      csv << row
    end
  end
end
