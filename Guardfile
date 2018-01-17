# minifyする
guard :shell do
  # hoge_concated.xxxを監視する
  watch(/(js|css)\/[\S]+_concated.(js|css)/) do |m|
    `rake minify #{m[0]}`
  end
end

guard :shell do
  # js
  watch(%r{^js\/[\S]+_min.js|^css/[\S]+.css|ruby\/[\S]+.rb|[\S]*.html}) do |m|
    puts "#{m[0]}が変更されたので、サーバへ上げ直すよ"
    `rake sync`
    # Macの画面に更新完了した旨をポップアップ
    `osascript -e 'display notification "rsync done!!" with title "Guard Auto Message"'`
  end
end

guard 'sass', input: 'sass', output: 'css'

# loginページのJSファイルを監視
guard :concat, type: 'js',
               files: %w[base_object login login_page], input_dir: 'js', output: 'js/login_concated'

guard :concat, type: 'js',
               files: %w[base_object display event form main_page], input_dir: 'js', output: 'js/main_concated'
