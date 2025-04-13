fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author "Err Boilerplate"
description "A modern FiveM boilerplate with latest React, Tailwind, and other modern technologies"
version '1.0.0'

server_scripts {
  'server/**/*'
}
client_scripts {
  'client/**/*',
}
shared_scripts {
  '@ox_lib/init.lua',
}

-- ui_page 'http://localhost:3000/' -- (for local dev)
ui_page 'web/build/index.html'

files {
  'web/build/index.html',
	'web/build/**/*',
  'config/*.lua'
}