require 'csv'
require 'erb'

users = CSV.read('./list/users.csv').to_h
user_id = nil

table = CSV.table('./list/progress_table.csv')
# 　配列に変換して転置
user_task = table.to_a.transpose
header = user_task.shift

form = <<FORM

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
      <progress value="0" max="100" class="progress" name="progress_bar"></progress>
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

html = <<TEMPLATE
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
      <%= form %>
      </td>
    <% end %>
  <% end %>
  </tr>
<% end %>
</tbody>
TEMPLATE

erb = ERB.new(html, nil, '>')
puts erb.result(binding)
