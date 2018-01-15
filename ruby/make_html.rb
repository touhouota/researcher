require 'csv'
require 'erb'

users = CSV.read('./list/users.csv').to_h
user_id = nil

table = CSV.table('./list/tasks.csv')
# 　配列に変換して転置
user_task = table.to_a.transpose
header = user_task.shift

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
      <td data-task="<%= header[idx] %>" class="<%= user_id %>"> <%= item %> </td>
    <% end %>
  <% end %>
  </tr>
<% end %>
</tbody>
TEMPLATE

erb = ERB.new(html, nil, '>')
puts erb.result(binding)
