$plan_csv = './list/plans.csv'
$tasks_csv = './list/tasks.csv'
$users_csv = './list/users.csv'

$csv_options = {
  headers: true,
  header_converters: :symbol,
  encoding: Encoding::UTF_8
}

$argument_error_str = 'が期待する引数が渡されていない'

# 期待したものが入っているか？
# 入っている => true
# 入っていない => false
def _check_data(hope, real)
  # キーに対応した値が入っているか
  values = hope.map do |key|
    # realにkeyがある && reak[key]の大きさが0でない
    # => きちんと値が入っている
    real[key].nil?.! && !real[key].empty?
  end
  if values.include?(false)
    # 指定したkeyを持たない
    return false
  else
    return true
  end
end

def check_account(json)
  hope = %i[user_id]
  raise ArgumentError, 'check_account' + $argument_error_str unless _check_data(hope, json)

  user = nil
  CSV.foreach($users_csv, encoding: 'UTF-8') do |user_info|
    user = user_info if user_info.first === json[:user_id]
  end
  if user
    user = { user_id: user[0], name: user[1] }
    return { ok: true, data: user }
  else
    return { ok: false, data: { message: 'ユーザが存在しません' } }
  end
end

def start_task(json)
  hope = %i[user_id plan_id]
  raise ArgumentError, 'append_task' + $argument_error_str unless _check_data(hope, json)

  tasks = CSV.table($plan_csv, encoding: 'UTF-8')

  # タスクを追加
  # new_row = CSV::Row.new(tasks.headers, [])
  new_row = nil
  CSV.open($plan_csv, 'a', encoding: 'UTF-8') do |csv|
    csv << tasks.headers
    tasks.each do |task|
      if task[:plan_id] == json[:plan_id]
        new_row = task.to_hash
        new_row[:date] = Time.now

        csv << new_row
      else
        csv << task
      end
    end
  end

  { ok: true, data: new_row.to_h }
end

def get_tasks
  tasks = CSV.read($plan_csv)

  { ok: true, data: tasks }
end

def modify_task(json)
  hope = %i[user_id plan_id]
  raise ArgumentError, 'modify_task' + $argument_error_str unless _check_data(hope, json)
end
