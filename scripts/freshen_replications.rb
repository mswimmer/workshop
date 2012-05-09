#! ruby
require 'rubygems'
require 'couchrest'
require 'optparse'

options = {}
OptionParser.new do |opts|
  opts.banner = "Usage: freshen_replications.rb [options]"

  opts.on("-d", "--database NAME", String, :required, "Database NAME") do |s|
    options[:db_name] = s
  end
  opts.on("-s", "--server URL", String, :required, "Server URL") do |s|
    options[:db_url] = s
  end
  opts.on("-r", "--remote URL", String, :required, "Remote Server URL") do |s|
    options[:db_remote_url] = s
  end
end.parse!

p options
p ARGV
exit(-1) unless options[:db_name] && options[:db_url] && options[:db_remote_url]

puts "Replication Freshening Daemon"

@continue_to_do_stuff = true

t = Thread.new do
  while @continue_to_do_stuff
    cmd = "curl -s -X POST -H 'Content-Type: application/json' -d '{\"source\": \"#{options[:db_name]}\", \"target\": \"#{options[:db_remote_url]}/#{options[:db_name]}\", \"continuous\": true}' #{options[:db_url]}/_replicate"
    puts "[#{cmd}]"
    #  p `curl -X POST -H 'Content-Type: application/json' -d '{"source": "#{options[:db_name]}", "target": "#{options[:db_remote_url]}/#{options[:db_name]}", "continuous": true}' #{options[:db_url]}/_replicate`
    puts `#{cmd}`
    
    cmd = "curl -s -X POST -H 'Content-Type: application/json' -d '{\"target\": \"#{options[:db_name]}\", \"source\": \"#{options[:db_remote_url]}/#{options[:db_name]}\", \"continuous\": true}' #{options[:db_url]}/_replicate"
    puts "[#{cmd}]"
    puts `#{cmd}`
    
    #  p `curl -X POST -H 'Content-Type: application/json' -d '{"target": "#{options[:db_name]}", "source": "#{options[:db_remote_url]}/#{options[:db_name]}", "continuous": true}' #{options[:db_url]}/_replicate`
    sleep 1800
  end
end

gets
puts "Exiting..."
@continue_to_do_stuff = false
sleep 1
t.kill
puts "Down"
