console.log("Starting Application...")
console.log("Starting Database...")
require('./datasource/storage/mongodb/Config')
console.log("Starting Database Complete...")
console.log("Starting Server on port 5000...")
require('./rest/Server.js')
console.log("Starting Server Complete...")
console.log("Starting Apis...")
require('./rest/api/CrawlersApi.js')
console.log("Starting Apis Complete...")
console.log("Application Started!")