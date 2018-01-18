# encoding: utf-8

require 'csv'

users = %w[b1013223 b1015076 b1015141 b1015172 b1015179 b1015209]
tasks = %w[２進数 CGI データベース HTTP URL HTMLタグ(formとか) HTML5_canvas 環境変数 GET/POST_(HTTPメソッド) HTTPリクエスト/レスポンス HTTPヘッダ/ボディ プロキシ パーミッション Shellコマンド mv rm cp ls ln chmod chown chgrp ssh scp sftp Apache Node.js XMLHTTPRequest JSON Ruby]
headers = %w[plan_id user_id task expected progress memo start finish].map(&:to_sym)

CSV.open('./list/plans.csv', 'w', encoding: 'UTF-8', headers: true) do |csv|
  csv << headers

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
