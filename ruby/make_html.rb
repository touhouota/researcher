# coding: utf-8

require 'csv'
require 'erb'

$form = <<-FORM
<form class="task_form hide">
  <p>
    <label>
      目標時間： <input type="number" name="minute" value="" step="5">分
    </label>
  </p>
  <p>
    <label>
      進捗度：
      <button type="button" class="minus">ー</button>
      <progress value="0" max="100" class="progress"></progress>
      <button type="button" class="plus">＋</button>
    </label>
  </p>
  <p>
    <label>
      メモ: <br>
      <textarea name="memo" rows="8" cols="80"></textarea>
    </label>
  </p>
  <input type="hidden" name="plan_id" value="">
</form>
FORM

def table
  users = CSV.read('./list/users.csv').to_h
  user_id = nil

  table = CSV.table('./list/progress_table.csv', encoding: 'UTF-8')
  #  配列に変換して転置
  user_task = table.to_a.transpose
  header = user_task.shift

  table = <<-TEMPLATE
  <thead><tr>
  <% header.each do |word| %>
    <th> <%= word %> </th>
  <% end %>
  </tr></thead>

  <tbody>
  <% user_task.each do |row| %>
    <tr>
    <% row.each_with_index do |item, idx| %>
      <% if(idx === 0) then %>
        <% user_id = item.to_s %>
        <td class="<%= user_id %>"> <%= users[user_id] %> </td>
      <% else %>
        <td data-task="<%= header[idx] %>" class="<%= user_id %>">
          <%= $form %>
        </td>
      <% end %>
    <% end %>
    </tr>
  <% end %>
  </tbody>
  TEMPLATE

  erb = ERB.new(table, nil, '>')
  puts erb.result(binding)
end

# テーブルの転置版
def table_reverse
  users = CSV.read('./list/users.csv').to_h.transform_keys!(&:to_sym)
  task = nil

  table = CSV.table('./list/progress_table.csv', encoding: 'UTF-8')
  # 配列に変換して転置
  user_task = table
  header = user_task.to_a.shift

  table = <<-TEMPLATE
  <thead><tr>
  <% header.each do |user| %>
    <%  %>
    <% if users[user].nil? then %>
      <th> <%= user  %> </th>
    <% else %>
      <th> <%= users[user] %> </th>
    <% end %>
  <% end %>
  </tr></thead>

  <tbody>
  <% user_task.each do |row| %>
    <tr>
    <% row.each do |user_id, _task_name| %>
      <% if(user_id === :word) then %>
        <% task = _task_name %>
        <td data-task="<% task %>">
          <%= task %>
        </td>
      <% else %>
        <td data-task="<%= task %>" class="<%= user_id %>">
          <%= $form %>
        </td>
      <% end %>
    <% end %>
    </tr>
  <% end %>
  </tbody>
  TEMPLATE

  erb = ERB.new(table, nil, '>')
  puts erb.result(binding)
end

##################################
# main
##################################
param = ARGV.map{|input| input.to_sym unless input.nil?}
if param == [:table] then
  table
else
  table_reverse
end
