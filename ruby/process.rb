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
  CSV.foreach('list/users.csv', encoding: 'UTF-8') do |user_info|
    user = user_info if user_info.first === json[:user_id]
  end
  if user
    user = { user_id: user[0], name: user[1] }
    return { ok: true, data: user }
  else
    return { ok: false, data: { message: 'ユーザが存在しません' } }
  end
end
