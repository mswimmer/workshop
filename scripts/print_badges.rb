#! ruby
require 'rubygems'
require 'couchrest'
require 'optparse'

options = {}
OptionParser.new do |opts|
  opts.banner = "Usage: print_badge.rb [options]"

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
exit(-1) unless options[:db_name] && options[:db_url]

# We start the replications just in case they failed again
if options[:db_remote_url]
    cmd = "curl -s -X POST -H 'Content-Type: application/json' -d '{\"source\": \"#{options[:db_name]}\", \"target\": \"#{options[:db_remote_url]}/#{options[:db_name]}\", \"continuous\": true}' #{options[:db_url]}/_replicate"
    puts "[#{cmd}]"
    puts `#{cmd}`
    
    cmd = "curl -s -X POST -H 'Content-Type: application/json' -d '{\"target\": \"#{options[:db_name]}\", \"source\": \"#{options[:db_remote_url]}/#{options[:db_name]}\", \"continuous\": true}' #{options[:db_url]}/_replicate"
    puts "[#{cmd}]"
    puts `#{cmd}`
end

print_page = options[:db_url]+"/" + options[:db_name] + "/_design/" + options[:db_name] +"/_rewrite"

@db = CouchRest.database(options[:db_url]+"/" + options[:db_name])
@continue_to_do_stuff = true

puts "Starting Badge Printing Daemon"

t = Thread.new do
  while @continue_to_do_stuff
    @db.view(options[:db_name]+"/print_requests")["rows"].each do |r|
      doc = @db.get(r['id']).to_hash
      puts "Printing badge: #{print_page}/badge/#{r['id']}"
      `wkpdf --source #{print_page}/badge/#{r['id']} --orientation landscape --stylesheet-media print --print-background --output /tmp/#{r['id']}.uncropped.pdf`
      `gs -o /tmp/#{r['id']}.cropped.pdf -sDEVICE=pdfwrite -c "[/CropBox [72 216 504 504] /PAGES pdfmark" -f /tmp/#{r['id']}.uncropped.pdf`
      # can't print from lpr, so using Preview instead
      `open -a Preview -F /tmp/#{r['id']}.cropped.pdf`

      # update document
      doc["to_print"] = false
      if doc["print_count"]
        doc["print_count"] += 1
      else
        doc["print_count"] = 1
      end
      @db.save_doc(doc)
      # increment the printed counter here
      puts "Press ENTER to end"
    end
    sleep 30
  end
end

gets
puts "Exiting..."
@continue_to_do_stuff = false
sleep 10
t.kill
puts "Down"

#convert -density 300x300 -quality 90 /tmp/a74065916eefac825d9fef5ce090028d.cropped.pdf  /tmp/a74065916eefac825d9fef5ce090028d.cropped.png
#lpr -o media=4x6.FullBleed,PhotoTray -o quality=fast-normal -o landscape /tmp/a74065916eefac825d9fef5ce090028d.cropped.png
